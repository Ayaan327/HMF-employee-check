import { redirect } from 'next/navigation';
import Portal from './portal';
import { authConfig, getPlatformUser, platformSignInPath } from './platform-auth';
export const dynamic = 'force-dynamic';
export default async function Home() {
  if (await getPlatformUser()) return <Portal />;
  const { mode } = authConfig();
  if (mode === 'sites') redirect(platformSignInPath('/'));
  return (
    <main className="simple-login">
      <section className="simple-login-form" role="alert">
        <h1>Sign-in unavailable</h1>
        <p className="muted">
          {mode === 'cloudflare-access'
            ? 'Your Microsoft 365 sign-in could not be verified. Reload the page to sign in again. If this keeps happening, contact HMF IT.'
            : 'Sign-in has not been set up for this site yet. Contact HMF IT.'}
        </p>
        {mode === 'cloudflare-access' && (
          <a className="primary" href="/cdn-cgi/access/logout">
            Sign in again
          </a>
        )}
      </section>
    </main>
  );
}
