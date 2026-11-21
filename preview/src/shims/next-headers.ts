// The preview stands in for the hosting platform's outer sign-in with one fixed local identity,
// like the loopback-only dev mock. The app's own employee login still applies on top.
const fixed = new Headers({
  'oai-authenticated-user-id': 'preview_visitor',
  'oai-authenticated-user-email': 'preview@hmf.example',
});
export async function headers() {
  return fixed;
}
export async function cookies() {
  return { get: () => undefined };
}
