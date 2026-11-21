// Turns dist/index.html into the body fragment the claude.ai Artifact host expects
// (it supplies its own doctype/head/body) and prints the files map for publishing.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const html = readFileSync(new URL('./dist/index.html', import.meta.url), 'utf8');
const head = html.match(/<head>([\s\S]*)<\/head>/)[1].replace(/<meta charset[^>]*>|<meta name="viewport"[^>]*>/g, '');
const body = html.match(/<body>([\s\S]*)<\/body>/)[1];
writeFileSync(new URL('./dist/artifact.html', import.meta.url), head.trim() + '\n' + body.trim() + '\n');
const files = Object.fromEntries(readdirSync(new URL('./dist/assets', import.meta.url)).map((f) => ['assets/' + f, 'preview/dist/assets/' + f]));
console.log(JSON.stringify(files));
