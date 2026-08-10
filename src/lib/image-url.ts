type ImageOptions = {
  width?: number;
  quality?: number;
};

const enabled =
  import.meta.env.PUBLIC_CLOUDFLARE_IMAGE_TRANSFORMS === 'true';
const host = (import.meta.env.PUBLIC_CLOUDFLARE_IMAGE_HOST ?? '').replace(/\/$/, '');

export function imageUrl(source: string, options: ImageOptions = {}) {
  if (!enabled || source.startsWith('data:') || source.includes('/cdn-cgi/image/')) {
    return source;
  }

  const params = [
    'width=' + (options.width ?? 1600),
    'quality=' + (options.quality ?? 82),
    'format=auto',
  ].join(',');
  const normalized = source.startsWith('/') ? source.slice(1) : source;

  return host + '/cdn-cgi/image/' + params + '/' + normalized;
}
