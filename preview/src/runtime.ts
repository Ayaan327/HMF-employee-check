// Shared mutable runtime for the preview shims (filled in by main.tsx before any route runs).
import type { PreviewD1 } from './d1';
export const runtime: { env: { DB?: PreviewD1; HMF_DEMO_MODE: string; HMF_DEMO_PASSWORD: string } } = {
  env: { HMF_DEMO_MODE: 'true', HMF_DEMO_PASSWORD: 'HmfDemo!2026' },
};
