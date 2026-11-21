// Shared mutable runtime for the preview shims (filled in by main.tsx before any route runs).
import type { PreviewD1 } from './d1';
import { AUD, TEAM, signInState } from './microsoft';
const microsoft = signInState().mode === 'microsoft';
export const runtime: { env: Record<string, unknown> & { DB?: PreviewD1 } } = {
  env: {
    HMF_DEMO_MODE: 'true',
    HMF_DEMO_PASSWORD: 'HmfDemo!2026',
    HMF_AUTH_MODE: microsoft ? 'cloudflare-access' : 'sites',
    ...(microsoft ? { ACCESS_TEAM_DOMAIN: TEAM, ACCESS_AUD: AUD } : {}),
  },
};
