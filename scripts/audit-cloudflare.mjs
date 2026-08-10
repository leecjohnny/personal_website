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
let lightboxImages = 0;
let transformedLightboxImages = 0;
let remoteOriginTransforms = 0;
let directlyLinkedImages = 0;

function isTransformedImage(source) {
  return (
    source.startsWith('/cdn-cgi/image/') ||
    source.startsWith('https://johnnyclee.com/cdn-cgi/image/')
  );
}

function usesRemoteTransformationOrigin(source) {
  const marker = '/cdn-cgi/image/';
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return false;
  const sourcePath = source.slice(markerIndex + marker.length).split('/').slice(1).join('/');
  return sourcePath.startsWith('http://') || sourcePath.startsWith('https://');
}

for (const file of files.filter((path) => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*>/gi)) {
    images += 1;
    if (isTransformedImage(match[1])) transformedImages += 1;
    if (usesRemoteTransformationOrigin(match[1])) remoteOriginTransforms += 1;
  }
  for (const match of html.matchAll(/data-image-src="([^"]+)"/gi)) {
    lightboxImages += 1;
    if (isTransformedImage(match[1])) transformedLightboxImages += 1;
    if (usesRemoteTransformationOrigin(match[1])) remoteOriginTransforms += 1;
  }
  directlyLinkedImages += [...html.matchAll(/<a\b[^>]*>\s*<img\b/gi)].length;
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
if (lightboxImages !== transformedLightboxImages) {
  failures.push(
    `${lightboxImages - transformedLightboxImages} of ${lightboxImages} lightbox images do not use /cdn-cgi/image/`,
  );
}
if (remoteOriginTransforms) {
  failures.push(`${remoteOriginTransforms} image transformations still depend on remote origins`);
}
if (directlyLinkedImages) {
  failures.push(`${directlyLinkedImages} article images still navigate directly from an anchor`);
}

const headersPath = join(root, '_headers');
const headers = readFileSync(headersPath, 'utf8');
for (const pattern of ['/_astro/*', '/assets/archive/*', '/assets/essay/*']) {
  if (!headers.includes(pattern)) failures.push(`_headers is missing a cache policy for ${pattern}`);
}

if (failures.length) {
  console.error(`Cloudflare audit failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Cloudflare audit passed: ${files.length} assets, no file over 25 MiB, ${transformedImages}/${images} rendered images and ${transformedLightboxImages}/${lightboxImages} lightbox images transformed, with static cache headers present.`,
);
