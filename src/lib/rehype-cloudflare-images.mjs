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

function walk(node) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element' && node.tagName === 'img') {
    node.properties ??= {};
    node.properties.src = transformedSource(node.properties.src);
    node.properties.loading ??= 'lazy';
    node.properties.decoding ??= 'async';
  }

  for (const child of node.children ?? []) walk(child);
}

export default function rehypeCloudflareImages() {
  return (tree) => walk(tree);
}
