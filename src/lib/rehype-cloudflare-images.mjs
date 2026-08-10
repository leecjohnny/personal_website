const HERO_ASSET_PATTERN = /(?:^|\/)item-[^/]+\.(?:avif|gif|jpe?g|png|webp)(?:[?#].*)?$/i;

function transformedSource(
  source,
  enabled,
  host,
  options = 'fit=scale-down,width=auto,quality=82,format=auto',
) {
  if (
    !enabled ||
    !source ||
    source.startsWith('data:') ||
    source.includes('/cdn-cgi/image/')
  ) {
    return source;
  }

  const normalized = source.startsWith('/') ? source.slice(1) : source;
  return host.replace(/\/$/, '') + '/cdn-cgi/image/' + options + '/' + normalized;
}

function imageAlt(file) {
  const title = file?.data?.astro?.frontmatter?.title;
  return title ? `Illustration from “${title}”` : 'Article illustration';
}

function addClass(node, className) {
  const current = node.properties?.className;
  const classes = Array.isArray(current)
    ? current
    : current
      ? String(current).split(/\s+/)
      : [];

  if (!classes.includes(className)) classes.push(className);
  node.properties.className = classes;
}

function imageChild(node) {
  if (node?.type !== 'element' || node.tagName !== 'a') return undefined;

  const meaningfulChildren = (node.children ?? []).filter(
    (child) => child.type !== 'text' || String(child.value ?? '').trim(),
  );

  if (
    meaningfulChildren.length === 1 &&
    meaningfulChildren[0].type === 'element' &&
    meaningfulChildren[0].tagName === 'img'
  ) {
    return meaningfulChildren[0];
  }
}

function imageLabel(image) {
  const alt = String(image.properties?.alt ?? '').trim();
  return alt ? `Open ${alt} at full size` : 'Open image at full size';
}

function prepareImage(node, file, enabled, host) {
  node.properties ??= {};
  node.properties.src = transformedSource(node.properties.src, enabled, host);
  if (!String(node.properties.alt ?? '').trim()) {
    node.properties.alt = imageAlt(file);
  }
  node.properties.loading ??= 'lazy';
  node.properties.decoding ??= 'async';
}

function walk(node, file, enabled, host) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element') {
    node.properties ??= {};
    const linkedImage = imageChild(node);

    if (linkedImage) {
      linkedImage.properties ??= {};
      const originalSource = String(linkedImage.properties.src ?? '');
      const linkedSource = String(node.properties.href ?? '');
      const isHero = HERO_ASSET_PATTERN.test(originalSource);

      prepareImage(linkedImage, file, enabled, host);

      if (isHero) {
        node.tagName = 'span';
        node.properties = { className: ['article-hero-image'] };
        addClass(linkedImage, 'article-hero-image__media');
      } else {
        const fullSource = /(?:\.(?:avif|gif|jpe?g|png|webp)(?:[?#].*)?$|\/image\/fetch\/)/i.test(
          linkedSource,
        )
          ? linkedSource
          : originalSource;

        node.tagName = 'button';
        node.properties = {
          type: 'button',
          className: ['article-image-button'],
          dataImageLightbox: '',
          dataImageSrc: transformedSource(
            fullSource,
            enabled,
            host,
            'fit=scale-down,width=2400,quality=90,format=auto',
          ),
          ariaLabel: imageLabel(linkedImage),
        };
      }

      return;
    }

    if (node.tagName === 'img') prepareImage(node, file, enabled, host);
  }

  for (const child of node.children ?? []) walk(child, file, enabled, host);
}

export default function rehypeCloudflareImages({ enabled = false, host = '' } = {}) {
  return (tree, file) => walk(tree, file, enabled, host);
}
