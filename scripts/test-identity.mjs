import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../app/lib/identity.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const { identityConfig, platformUser, verifyAccessToken } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

const TEAM = 'hmf-test.cloudflareaccess.com';
const AUD = 'a'.repeat(64);
const config = identityConfig({ HMF_AUTH_MODE: 'cloudflare-access', ACCESS_TEAM_DOMAIN: TEAM, ACCESS_AUD: AUD }, false);
const pair = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
const other = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
const jwk = { ...(await crypto.subtle.exportKey('jwk', pair.publicKey)), kid: 'k1' };
let fetches = 0;
const keys = async () => { fetches++; return [jwk]; };
const b64 = (v) => Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url');
const now = Date.UTC(2026, 10, 21, 12);
const secs = Math.floor(now / 1000);
const goodClaims = { aud: [AUD], iss: 'https://' + TEAM, sub: 'entra-oid-123', email: 'Amelia.Clarke@hmf.example', name: 'Amelia Clarke', iat: secs - 10, nbf: secs - 10, exp: secs + 3600, type: 'app' };
async function sign(claims, { header = { alg: 'RS256', kid: 'k1', typ: 'JWT' }, key = pair.privateKey } = {}) {
  const body = b64(header) + '.' + b64(claims);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(body));
  return body + '.' + Buffer.from(sig).toString('base64url');
}
const verify = (token) => verifyAccessToken(token, config, keys, now);

test('mode selection fails closed in production', () => {
  assert.equal(identityConfig({}, false).mode, 'unconfigured');
  assert.equal(identityConfig({}, true).mode, 'sites');
  assert.equal(identityConfig({ HMF_AUTH_MODE: 'sites' }, false).mode, 'sites');
  assert.equal(identityConfig({ HMF_AUTH_MODE: 'something' }, false).mode, 'unconfigured');
  assert.equal(identityConfig({ HMF_AUTH_MODE: 'cloudflare-access', ACCESS_TEAM_DOMAIN: 'evil.example.com', ACCESS_AUD: AUD }, false).mode, 'unconfigured');
  assert.equal(identityConfig({ HMF_AUTH_MODE: 'cloudflare-access', ACCESS_TEAM_DOMAIN: TEAM, ACCESS_AUD: 'short' }, false).mode, 'unconfigured');
  assert.equal(config.mode, 'cloudflare-access');
  assert.equal(config.passwordLogin, 'all');
  assert.equal(identityConfig({ HMF_PASSWORD_LOGIN: 'system-admins' }, true).passwordLogin, 'system-admins');
});

test('a valid Cloudflare Access token yields the verified person', async () => {
  const headers = new Headers({ 'cf-access-jwt-assertion': await sign(goodClaims) });
  const user = await platformUser(headers, config, keys, now);
  assert.deepEqual(user, { provider: 'cloudflare-access', userId: 'cf:entra-oid-123', email: 'amelia.clarke@hmf.example', displayName: 'Amelia Clarke', fullName: 'Amelia Clarke' });
});

test('forged, altered, expired and misdirected tokens are rejected', async () => {
  assert.equal(await verify(await sign(goodClaims, { key: other.privateKey })), null, 'wrong signing key');
  const good = await sign(goodClaims);
  const [h, , s] = good.split('.');
  assert.equal(await verify(h + '.' + b64({ ...goodClaims, email: 'admin@hmf.example' }) + '.' + s), null, 'tampered claims');
  assert.equal(await verify(await sign({ ...goodClaims, exp: secs - 120 })), null, 'expired');
  assert.equal(await verify(await sign({ ...goodClaims, nbf: secs + 600 })), null, 'not yet valid');
  assert.equal(await verify(await sign({ ...goodClaims, aud: ['b'.repeat(64)] })), null, 'other application');
  assert.equal(await verify(await sign({ ...goodClaims, iss: 'https://other.cloudflareaccess.com' })), null, 'other team');
  assert.equal(await verify(await sign({ ...goodClaims, email: undefined, sub: '' })), null, 'service token');
  assert.equal(await verify(b64({ alg: 'none', kid: 'k1' }) + '.' + b64(goodClaims) + '.'), null, 'alg none');
  assert.equal(await verify(await sign(goodClaims, { header: { alg: 'HS256', kid: 'k1' } })), null, 'hmac alg');
  assert.equal(await verify('not.a.jwt'), null, 'garbage');
  assert.notEqual(await verify(await sign({ ...goodClaims, exp: secs - 30 })), null, 'small clock skew tolerated');
});

test('browser-supplied identity headers are ignored outside Sites mode', async () => {
  const spoof = new Headers({ 'oai-authenticated-user-id': 'x', 'oai-authenticated-user-email': 'admin@hmf.example', 'cf-access-authenticated-user-email': 'admin@hmf.example' });
  assert.equal(await platformUser(spoof, config, keys, now), null);
  assert.equal(await platformUser(spoof, identityConfig({}, false), keys, now), null);
  const sites = await platformUser(spoof, identityConfig({ HMF_AUTH_MODE: 'sites' }, false), keys, now);
  assert.equal(sites.email, 'admin@hmf.example');
});

test('unknown key ids trigger one key refresh', async () => {
  fetches = 0;
  assert.equal(await verify(await sign(goodClaims, { header: { alg: 'RS256', kid: 'rotated' } })), null);
  assert.equal(fetches, 2);
});
