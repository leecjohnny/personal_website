import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const contentDirectory = join(root, 'src/content/blog');
const assetDirectory = join(root, 'public/assets/archive');
const remoteImagePattern = /https?:\/\/[^\s)"']+\.(?:avif|gif|jpe?g|png|webp)(?:\?[^\s)"']*)?/gi;
const mimeExtensions = new Map([
  ['image/avif', '.avif'],
  ['image/gif', '.gif'],
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
]);

function canonicalSource(url) {
  const encodedSource = url.search(/https?%3A%2F%2F/i);
  return encodedSource === -1 ? url : decodeURIComponent(url.slice(encodedSource));
}

function existingAsset(hash) {
  return readdirSync(assetDirectory).find((file) => file.startsWith(`remote-${hash}.`));
}

async function downloadImage(canonical, candidates, hash) {
  const sources = [canonical, ...candidates.filter((url) => url !== canonical)];
  let lastError;

  for (const source of sources) {
    try {
      const response = await fetch(source, {
        headers: { 'user-agent': 'johnnyclee.com content archiver' },
        redirect: 'follow',
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const contentType = response.headers.get('content-type')?.split(';')[0].toLowerCase();
      if (!contentType?.startsWith('image/')) {
        throw new Error(`unexpected content type ${contentType ?? 'unknown'}`);
      }

      const extension = mimeExtensions.get(contentType) ?? extname(new URL(canonical).pathname) ?? '.img';
      const filename = `remote-${hash}${extension.toLowerCase()}`;
      writeFileSync(join(assetDirectory, filename), Buffer.from(await response.arrayBuffer()));
      return filename;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`Could not archive ${canonical}: ${lastError}`);
}

mkdirSync(assetDirectory, { recursive: true });

const markdownFiles = readdirSync(contentDirectory).filter((file) => file.endsWith('.md'));
const documents = markdownFiles.map((file) => {
  const path = join(contentDirectory, file);
  return { path, content: readFileSync(path, 'utf8') };
});
const groups = new Map();

for (const document of documents) {
  for (const line of document.content.split('\n')) {
    if (!line.includes('![')) continue;

    for (const url of line.match(remoteImagePattern) ?? []) {
      const canonical = canonicalSource(url);
      const candidates = groups.get(canonical) ?? new Set();
      candidates.add(url);
      groups.set(canonical, candidates);
    }
  }
}

const replacements = new Map();
for (const [canonical, candidates] of groups) {
  const hash = createHash('sha256').update(canonical).digest('hex').slice(0, 32);
  const filename = existingAsset(hash) ?? (await downloadImage(canonical, [...candidates], hash));
  const localPath = `/assets/archive/${filename}`;
  for (const candidate of candidates) replacements.set(candidate, localPath);
}

let changedFiles = 0;
for (const document of documents) {
  let updated = document.content;
  for (const [remote, local] of replacements) updated = updated.split(remote).join(local);
  if (updated !== document.content) {
    writeFileSync(document.path, updated);
    changedFiles += 1;
  }
}

console.log(
  `Localized ${groups.size} remote images across ${changedFiles} Markdown files in public/assets/archive.`,
);
