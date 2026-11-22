// Platform identity: who the hosting platform says is making this request.
// This is the outer gate in front of the app's own employee session.
//
// Modes (HMF_AUTH_MODE):
//  - 'cloudflare-access': HMF-owned hosting. Cloudflare Access (with Microsoft Entra ID as the
//    login method) signs a JWT for every request. We verify its signature, audience, issuer
//    and lifetime. Identity headers sent by the browser are never trusted.
//  - 'sites': the original OpenAI Sites platform, which injects oai-authenticated-user-*
//    headers. Only safe on that platform (or the loopback-only local mock). Must be chosen
//    explicitly in production.
//  - unset: 'sites' in local development, otherwise 'unconfigured' and every request is
//    refused. A deployment without an explicit mode therefore fails closed.

export type AuthMode = 'cloudflare-access' | 'sites' | 'unconfigured';

export type PlatformUser = {
  provider: 'cloudflare-access' | 'sites';
  userId: string;
  email: string;
  displayName: string;
  fullName: string | null;
};

export type IdentityConfig = {
  mode: AuthMode;
  teamDomain?: string;
  audience?: string;
  passwordLogin: 'all' | 'system-admins';
  // What people see for the company sign-in, e.g. "Microsoft 365" or "email code" (demo).
  signInName: string;
  problem?: string;
};

type IdentityEnv = {
  HMF_AUTH_MODE?: string;
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  HMF_PASSWORD_LOGIN?: string;
  HMF_SIGNIN_NAME?: string;
};

const TEAM_DOMAIN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.cloudflareaccess\.com$/;
const AUDIENCE = /^[a-f0-9]{64}$/;

export function identityConfig(env: IdentityEnv, development: boolean): IdentityConfig {
  const passwordLogin = env.HMF_PASSWORD_LOGIN === 'system-admins' ? 'system-admins' : 'all';
  const signInName = (env.HMF_SIGNIN_NAME || '').trim().slice(0, 40) || 'Microsoft 365';
  const mode = env.HMF_AUTH_MODE || (development ? 'sites' : '');
  if (mode === 'sites') return { mode: 'sites', passwordLogin, signInName };
  if (mode === 'cloudflare-access') {
    const teamDomain = (env.ACCESS_TEAM_DOMAIN || '').trim().toLowerCase();
    const audience = (env.ACCESS_AUD || '').trim().toLowerCase();
    if (!TEAM_DOMAIN.test(teamDomain) || !AUDIENCE.test(audience))
      return {
        mode: 'unconfigured',
        passwordLogin,
        signInName,
        problem: 'ACCESS_TEAM_DOMAIN or ACCESS_AUD is missing or invalid.',
      };
    return { mode, teamDomain, audience, passwordLogin, signInName };
  }
  return {
    mode: 'unconfigured',
    passwordLogin,
    signInName,
    problem: mode ? `Unknown HMF_AUTH_MODE "${mode}".` : 'HMF_AUTH_MODE is not set.',
  };
}

export async function platformUser(
  headers: Headers,
  config: IdentityConfig,
  keys: KeySource = accessKeys,
  now = Date.now(),
): Promise<PlatformUser | null> {
  if (config.mode === 'sites') return sitesUser(headers);
  if (config.mode === 'cloudflare-access') {
    const token = headers.get('cf-access-jwt-assertion');
    if (!token) return null;
    const claims = await verifyAccessToken(token, config, keys, now);
    if (!claims) return null;
    const name = typeof claims.name === 'string' && claims.name.trim() ? claims.name.trim() : null;
    return {
      provider: 'cloudflare-access',
      userId: 'cf:' + claims.sub,
      email: claims.email.toLowerCase(),
      displayName: name ?? claims.email,
      fullName: name,
    };
  }
  return null;
}

// ---------- OpenAI Sites (legacy platform) ----------
function sitesUser(headers: Headers): PlatformUser | null {
  const userId = headers.get('oai-authenticated-user-id');
  const email = headers.get('oai-authenticated-user-email');
  if (!userId || !email) return null;
  const encoded = headers.get('oai-authenticated-user-full-name');
  const fullName =
    encoded && headers.get('oai-authenticated-user-full-name-encoding') === 'percent-encoded-utf-8'
      ? safeDecode(encoded)
      : null;
  return { provider: 'sites', userId, email, displayName: fullName ?? email, fullName };
}
function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return null;
  }
}

// ---------- Cloudflare Access JWT ----------
type Jwk = JsonWebKey & { kid?: string };
export type KeySource = (teamDomain: string, refresh: boolean) => Promise<Jwk[]>;
type AccessClaims = { sub: string; email: string; name?: unknown; [k: string]: unknown };

const SKEW_SECONDS = 60;
let cachedKeys: { domain: string; keys: Jwk[]; at: number } | null = null;

// Cloudflare publishes the signing keys for each Access team. Cache them briefly and refetch
// once when a token names a key we have not seen (keys rotate).
export const accessKeys: KeySource = async (teamDomain, refresh) => {
  const fresh =
    cachedKeys && cachedKeys.domain === teamDomain && Date.now() - cachedKeys.at < 600_000;
  if (fresh && !refresh) return cachedKeys!.keys;
  const response = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!response.ok) throw new Error('Unable to load Cloudflare Access signing keys.');
  const body = (await response.json()) as { keys?: Jwk[] };
  const keys = Array.isArray(body.keys) ? body.keys : [];
  cachedKeys = { domain: teamDomain, keys, at: Date.now() };
  return keys;
};

function base64UrlBytes(part: string) {
  const padded = part.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((part.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
function decodeJson(part: string): Record<string, unknown> | null {
  try {
    const value = JSON.parse(new TextDecoder().decode(base64UrlBytes(part)));
    return value && typeof value === 'object' && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

export async function verifyAccessToken(
  token: string,
  config: IdentityConfig,
  keys: KeySource,
  now = Date.now(),
): Promise<AccessClaims | null> {
  if (config.mode !== 'cloudflare-access' || !config.teamDomain || !config.audience) return null;
  const parts = token.split('.');
  if (parts.length !== 3 || token.length > 8192) return null;
  const header = decodeJson(parts[0]);
  const claims = decodeJson(parts[1]);
  // Only RS256 is accepted; "none" and HMAC algorithms are rejected outright.
  if (!header || !claims || header.alg !== 'RS256' || typeof header.kid !== 'string') return null;

  let candidates = (await keys(config.teamDomain, false)).filter((k) => k.kid === header.kid);
  if (!candidates.length)
    candidates = (await keys(config.teamDomain, true)).filter((k) => k.kid === header.kid);
  const jwk = candidates[0];
  if (!jwk || jwk.kty !== 'RSA') return null;
  let valid = false;
  try {
    const key = await crypto.subtle.importKey(
      'jwk',
      { kty: 'RSA', n: jwk.n, e: jwk.e, alg: 'RS256', ext: true },
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    valid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      base64UrlBytes(parts[2]),
      new TextEncoder().encode(parts[0] + '.' + parts[1]),
    );
  } catch {
    return null;
  }
  if (!valid) return null;

  const seconds = Math.floor(now / 1000);
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!audiences.includes(config.audience)) return null;
  if (claims.iss !== `https://${config.teamDomain}`) return null;
  if (typeof claims.exp !== 'number' || claims.exp + SKEW_SECONDS < seconds) return null;
  if (typeof claims.nbf === 'number' && claims.nbf - SKEW_SECONDS > seconds) return null;
  if (typeof claims.iat === 'number' && claims.iat - SKEW_SECONDS > seconds) return null;
  // Person tokens carry a subject and email; service tokens do not and are refused.
  if (typeof claims.sub !== 'string' || !claims.sub) return null;
  if (typeof claims.email !== 'string' || !/^[^\s@]+@[^\s@]+$/.test(claims.email)) return null;
  return claims as AccessClaims;
}

export const accessSignOutPath = '/cdn-cgi/access/logout';
