// Stands in for the hosting platform's outer sign-in. Password mode mimics the original
// platform (one fixed local visitor); Microsoft mode sends a signed Cloudflare Access token.
import { accessToken, signInState } from '../microsoft';
const sites = new Headers({
  'oai-authenticated-user-id': 'preview_visitor',
  'oai-authenticated-user-email': 'preview@hmf.example',
});
export async function headers() {
  const state = signInState();
  if (state.mode !== 'microsoft') return sites;
  const token = state.email ? await accessToken(state.email) : null;
  return new Headers(token ? { 'cf-access-jwt-assertion': token } : {});
}
export async function cookies() {
  return { get: () => undefined };
}
