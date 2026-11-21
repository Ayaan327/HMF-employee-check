// The real platform-auth module, except that "sign out of Microsoft" stays inside the preview
// page (the real Cloudflare Access logout URL does not exist here).
import * as real from '../../../app/platform-auth.ts';
export const { authConfig, getPlatformUser, platformSignInPath, platformSignOutPath } = real;
export type { PlatformUser } from '../../../app/platform-auth.ts';
export function clientAuth() {
  const auth = real.clientAuth();
  return auth.signOutUrl ? { ...auth, signOutUrl: '#signed-out' } : auth;
}
