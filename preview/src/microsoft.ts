// Simulated Microsoft 365 sign-in for the preview: stands in for Cloudflare Access + Entra ID.
// It signs real RS256 Access-style tokens in the browser, so the app's genuine token
// verification and single sign-on code path run unchanged.
export const TEAM = 'hmf-preview.cloudflareaccess.com';
export const AUD = 'f'.repeat(64);
const KEY = 'hmf-preview-signin';

type State = { mode: 'password' | 'microsoft'; email?: string };
export function signInState(): State {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { mode: 'password' };
}
export function setSignInState(state: State) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

let pair: CryptoKeyPair | null = null;
let jwk: JsonWebKey | null = null;
export async function prepareKeys() {
  pair = await crypto.subtle.generateKey(
    { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true,
    ['sign', 'verify'],
  );
  jwk = { ...(await crypto.subtle.exportKey('jwk', pair.publicKey)), kid: 'preview' } as JsonWebKey;
}
export const certs = () => ({ keys: jwk ? [jwk] : [] });

const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const enc = (v: unknown) => b64(new TextEncoder().encode(JSON.stringify(v)));
export async function accessToken(email: string) {
  if (!pair) return null;
  const now = Math.floor(Date.now() / 1000);
  const sub = 'preview-' + Array.from(new TextEncoder().encode(email)).reduce((h, c) => (h * 31 + c) >>> 0, 7).toString(16);
  const name = email.split('@')[0].split('.').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' ');
  const body = enc({ alg: 'RS256', kid: 'preview', typ: 'JWT' }) + '.' +
    enc({ aud: [AUD], iss: 'https://' + TEAM, sub, email, name, iat: now, nbf: now, exp: now + 3600, type: 'app' });
  const sig = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', pair.privateKey, new TextEncoder().encode(body)));
  return body + '.' + b64(sig);
}
