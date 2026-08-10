import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const maximumAssetSize = 25 * 1024 * 1024;
const maximumFreePlanFiles = 20_000;

function filesIn(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) filesIn(path, files);
    else files.push(path);
  }
  return files;
}

const files = filesIn(root);
const oversized = files.filter((file) => statSync(file).size > maximumAssetSize);
let images = 0;
let transformedImages = 0;

for (const file of files.filter((path) => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*>/gi)) {
    images += 1;
    if (match[1].startsWith('/cdn-cgi/image/')) transformedImages += 1;
  }
}

const failures = [];
if (files.length > maximumFreePlanFiles) {
  failures.push(`${files.length} files exceeds the Workers Free limit of ${maximumFreePlanFiles}`);
}
for (const file of oversized) {
  const size = (statSync(file).size / 1024 / 1024).toFixed(1);
  failures.push(`${relative(root, file)} is ${size} MiB; maximum is 25 MiB`);
}
if (images !== transformedImages) {
  failures.push(`${images - transformedImages} of ${images} rendered images do not use /cdn-cgi/image/`);
}

if (failures.length) {
  console.error(`Cloudflare audit failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Cloudflare audit passed: ${files.length} assets, no file over 25 MiB, ${transformedImages}/${images} images transformed.`,
);
