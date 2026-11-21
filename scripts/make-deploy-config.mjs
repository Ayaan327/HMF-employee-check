// Builds an HMF-owned Wrangler config for one environment from deploy/<env>.json, on top of
// the config that `npm run build` writes. Usage: node scripts/make-deploy-config.mjs staging
// It never contains secrets or demo settings, and refuses placeholder values.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const env = process.argv[2];
if (!['staging', 'production'].includes(env)) throw new Error('Usage: make-deploy-config.mjs staging|production');
const built = 'dist/server/wrangler.json';
if (!existsSync(built)) throw new Error('Run npm run build first.');
const inputPath = process.env.HMF_DEPLOY_INPUT || `deploy/${env}.json`;
const input = JSON.parse(readFileSync(inputPath, 'utf8'));

const problems = [];
const need = (key, pattern, hint) => {
  const value = input[key];
  if (typeof value !== 'string' || value.includes('REPLACE') || !pattern.test(value)) problems.push(`${key}: ${hint}`);
};
need('workerName', /^[a-z0-9][a-z0-9-]{0,62}$/, 'lowercase letters, digits and hyphens');
need('accountId', /^[a-f0-9]{32}$/, '32-character Cloudflare account ID');
need('d1DatabaseName', /^[a-z0-9][a-z0-9-_]{0,62}$/, 'D1 database name');
need('d1DatabaseId', /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, 'D1 database UUID');
need('accessTeamDomain', /^[a-z0-9-]+\.cloudflareaccess\.com$/, '<team>.cloudflareaccess.com');
need('accessAud', /^[a-f0-9]{64}$/, '64-character Access application AUD tag');
if (!['all', 'system-admins'].includes(input.passwordLogin)) problems.push('passwordLogin: "all" or "system-admins"');
if (input.customDomain !== null && !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(String(input.customDomain))) problems.push('customDomain: hostname or null');
if (input.d1DatabaseId === '00000000-0000-4000-8000-000000000000') problems.push('d1DatabaseId: still the local placeholder');
if (problems.length) {
  console.error(`${inputPath} is not ready:\n - ` + problems.join('\n - '));
  process.exit(1);
}

const config = JSON.parse(readFileSync(built, 'utf8'));
config.name = input.workerName;
config.topLevelName = input.workerName;
config.account_id = input.accountId;
config.workers_dev = env === 'staging';
config.d1_databases = [
  { binding: 'DB', database_name: input.d1DatabaseName, database_id: input.d1DatabaseId, migrations_dir: '../../drizzle' },
];
// Deliberately replaces any vars from the build: never ship HMF_DEMO_MODE / demo passwords.
config.vars = {
  HMF_AUTH_MODE: 'cloudflare-access',
  ACCESS_TEAM_DOMAIN: input.accessTeamDomain,
  ACCESS_AUD: input.accessAud,
  HMF_PASSWORD_LOGIN: input.passwordLogin,
};
config.routes = input.customDomain ? [{ pattern: input.customDomain, custom_domain: true }] : [];
delete config.services;
const out = `dist/server/wrangler.${env}.json`;
writeFileSync(out, JSON.stringify(config, null, 2));
console.log(`Wrote ${out}. Next (needs Cloudflare login, run by HMF IT):`);
console.log(`  npx wrangler d1 migrations apply ${input.d1DatabaseName} --remote --config ${out}`);
console.log(`  npx wrangler deploy --config ${out}`);
