import { env } from 'cloudflare:workers';
import { headers } from 'next/headers';
import {
  identityConfig,
  platformUser,
  accessSignOutPath,
  type IdentityConfig,
  type PlatformUser,
} from './lib/identity';

export type { PlatformUser } from './lib/identity';

// Sites-only sign-in routes (served by the Sites platform, or the loopback dev mock).
const SIGN_IN_PATH = '/signin-with-chatgpt';
const SIGN_OUT_PATH = '/signout-with-chatgpt';
const CALLBACK_PATH = '/callback';

export function authConfig(): IdentityConfig {
  return identityConfig(env as unknown as Record<string, string | undefined>, import.meta.env.DEV);
}

export async function getPlatformUser(): Promise<PlatformUser | null> {
  const config = authConfig();
  if (config.mode === 'unconfigured') {
    console.error('HMF attendance sign-in is not configured:', config.problem);
    return null;
  }
  try {
    return await platformUser(await headers(), config);
  } catch (error) {
    console.error('HMF attendance could not verify platform identity', error);
    return null;
  }
}

// What the browser needs to know about sign-in for this deployment (no secrets).
export function clientAuth() {
  const config = authConfig();
  return {
    mode: config.mode,
    sso: config.mode === 'cloudflare-access',
    signOutUrl: config.mode === 'cloudflare-access' ? accessSignOutPath : null,
  };
}

export function platformSignInPath(returnTo: string): string {
  return `${SIGN_IN_PATH}?return_to=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`;
}

export function platformSignOutPath(returnTo = '/'): string {
  return `${SIGN_OUT_PATH}?return_to=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`;
}

function safeRelativeReturnPath(value: string): string {
  if (!value.startsWith('/') || value.startsWith('//')) return '/';
  let url: URL;
  try {
    url = new URL(value, 'https://app.local');
  } catch {
    return '/';
  }
  if (url.origin !== 'https://app.local') return '/';
  if ([SIGN_IN_PATH, SIGN_OUT_PATH, CALLBACK_PATH].includes(url.pathname)) return '/';
  return `${url.pathname}${url.search}${url.hash}`;
}
