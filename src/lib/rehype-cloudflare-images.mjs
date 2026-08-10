const enabled = process.env.PUBLIC_CLOUDFLARE_IMAGE_TRANSFORMS === 'true';

function transformedSource(source) {
  if (
    !enabled ||
    !source ||
    source.startsWith('data:') ||
    source.startsWith('/cdn-cgi/')
  ) {
    return source;
  }

  const normalized = source.startsWith('/') ? source.slice(1) : source;
  return '/cdn-cgi/image/width=auto,quality=82,format=auto/' + normalized;
}

function imageAlt(file) {
  const title = file?.data?.astro?.frontmatter?.title;
  return title ? `Illustration from “${title}”` : 'Article illustration';
}

function walk(node, file) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.tagName === 'img') {
    node.properties ??= {};
    node.properties.src = transformedSource(node.properties.src);
    if (!String(node.properties.alt ?? '').trim()) {
      node.properties.alt = imageAlt(file);
    }
    node.properties.loading ??= 'lazy';
    node.properties.decoding ??= 'async';
  }

  for (const child of node.children ?? []) walk(child, file);
}

export default function rehypeCloudflareImages() {
  return (tree, file) => walk(tree, file);
}
