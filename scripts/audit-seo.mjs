import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const rootPath = root.pathname;

function filesNamed(directory, filename, matches = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) filesNamed(path, filename, matches);
    else if (entry.name === filename) matches.push(path);
  }
  return matches;
}

function attribute(html, selector, attributeName) {
  const tag = html.match(selector)?.[0];
  return tag?.match(new RegExp(`${attributeName}="([^"]*)"`))?.[1];
}

const htmlFiles = filesNamed(rootPath, 'index.html');
const failures = [];
const descriptions = new Map();
const canonicals = new Set();
let articlePages = 0;
let images = 0;
let emptyImageAlts = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const label = relative(rootPath, file);
  const canonical = attribute(html, /<link\s+rel="canonical"[^>]*>/i, 'href');
  const description = attribute(html, /<meta\s+name="description"[^>]*>/i, 'content');
  const h1Count = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;
  const imageTags = html.match(/<img(?:\s|>)[^>]*>/gi) ?? [];
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];

  images += imageTags.length;
  emptyImageAlts += imageTags.filter((tag) => !/\salt="[^"]+"/i.test(tag)).length;

  const required = [
    ['title', /<title>[^<]+<\/title>/i],
    ['description', /<meta\s+name="description"[^>]+>/i],
    ['canonical', /<link\s+rel="canonical"[^>]+>/i],
    ['robots meta', /<meta\s+name="robots"[^>]+>/i],
    ['favicon', /<link\s+rel="icon"[^>]+href="\/favicon\.svg"/i],
    ['RSS discovery', /<link\s+rel="alternate"[^>]+application\/rss\+xml/i],
    ['Open Graph title', /<meta\s+property="og:title"[^>]+>/i],
    ['Open Graph description', /<meta\s+property="og:description"[^>]+>/i],
    ['Open Graph image', /<meta\s+property="og:image"[^>]+>/i],
    ['Twitter image', /<meta\s+name="twitter:image"[^>]+>/i],
    ['JSON-LD', /<script type="application\/ld\+json">/i],
  ];

  for (const [name, pattern] of required) {
    if (!pattern.test(html)) failures.push(`${label}: missing ${name}`);
  }
  if (h1Count !== 1) failures.push(`${label}: expected one h1, found ${h1Count}`);
  if (!canonical) failures.push(`${label}: canonical URL is empty`);
  else canonicals.add(canonical);
  if (!description) failures.push(`${label}: description is empty`);
  else descriptions.set(description, [...(descriptions.get(description) ?? []), label]);

  for (const schema of schemas) {
    try {
      JSON.parse(schema[1]);
    } catch {
      failures.push(`${label}: invalid JSON-LD`);
    }
  }

  if (canonical?.includes('/i/')) {
    articlePages += 1;
    if (!/<meta\s+property="og:type"\s+content="article">/i.test(html)) {
      failures.push(`${label}: article Open Graph type is missing`);
    }
    if (!html.includes('"@type":"BlogPosting"')) {
      failures.push(`${label}: BlogPosting schema is missing`);
    }
  }
}

for (const [description, pages] of descriptions) {
  if (pages.length > 1) failures.push(`duplicate description on ${pages.join(', ')}: ${description}`);
}

const requiredFiles = [
  'favicon.svg',
  'og-default.png',
  'robots.txt',
  'rss.xml',
  'sitemap-index.xml',
  'sitemap-0.xml',
];
for (const file of requiredFiles) {
  if (!existsSync(join(rootPath, file))) failures.push(`missing dist/${file}`);
}

const sitemap = readFileSync(join(rootPath, 'sitemap-0.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
for (const url of canonicals) {
  if (!sitemapUrls.has(url)) failures.push(`canonical missing from sitemap: ${url}`);
}
for (const url of sitemapUrls) {
  if (!canonicals.has(url)) failures.push(`sitemap URL has no matching canonical page: ${url}`);
}

const rss = readFileSync(join(rootPath, 'rss.xml'), 'utf8');
const rssItems = rss.match(/<item>/g)?.length ?? 0;
const robots = readFileSync(join(rootPath, 'robots.txt'), 'utf8');
if (!robots.includes('User-agent: *') || !robots.includes('Sitemap: https://johnnyclee.com/sitemap-index.xml')) {
  failures.push('robots.txt is missing the wildcard agent or sitemap directive');
}
if (emptyImageAlts > 0) failures.push(`${emptyImageAlts} of ${images} images have empty or missing alt text`);
if (sitemapUrls.size !== htmlFiles.length) failures.push(`sitemap has ${sitemapUrls.size} URLs for ${htmlFiles.length} pages`);
if (rssItems !== 28) failures.push(`RSS has ${rssItems} items; expected 28`);
if (articlePages !== 28) failures.push(`found ${articlePages} article pages; expected 28`);

if (failures.length) {
  console.error(`SEO audit failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO audit passed: ${htmlFiles.length} pages, ${articlePages} articles, ${sitemapUrls.size} sitemap URLs, ${rssItems} RSS items, ${images} images with alt text.`);
