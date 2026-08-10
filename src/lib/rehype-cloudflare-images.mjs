function transformedSource(source, enabled) {
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

function walk(node, file, enabled) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.tagName === 'img') {
    node.properties ??= {};
    node.properties.src = transformedSource(node.properties.src, enabled);
    if (!String(node.properties.alt ?? '').trim()) {
      node.properties.alt = imageAlt(file);
    }
    node.properties.loading ??= 'lazy';
    node.properties.decoding ??= 'async';
  }

  for (const child of node.children ?? []) walk(child, file, enabled);
}

export default function rehypeCloudflareImages({ enabled = false } = {}) {
  return (tree, file) => walk(tree, file, enabled);
}
