'use client';
// When an API request answers 401 while someone is signed in, their app session has ended
// (the 8-hour limit, or a sign-out in another tab). Reload once so the normal sign-in flow runs:
// automatic with Microsoft 365 / email-code sign-in, or the sign-in page otherwise. Guarded so a
// page that keeps failing never reloads in a loop. Failed sign-in attempts are not affected
// because nobody is signed in yet.
let signedIn = false;
export function markSignedIn(value: boolean) {
  signedIn = value;
}
export function sessionEnded(status: number): boolean {
  if (status !== 401 || !signedIn || typeof window === 'undefined') return false;
  try {
    const last = Number(sessionStorage.getItem('hmf-session-reload') || 0);
    if (Date.now() - last < 60_000) return false;
    sessionStorage.setItem('hmf-session-reload', String(Date.now()));
  } catch {
    return false;
  }
  signedIn = false;
  window.location.reload();
  return true;
}
