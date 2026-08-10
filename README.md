# johnnyclee.com

The Astro/Vite rebuild of [johnnyclee.com](https://johnnyclee.com): a small personal blog backed by Markdown content and matched to the original site’s minimal visual language.

## What is included

- 28 archived Microfeed articles in `src/content/blog/`.
- Existing article URLs preserved under `/i/`, including case-sensitive IDs.
- Local copies of the site’s CDN assets in `public/assets/archive/`.
- RSS at `/rss.xml` and a generated sitemap.
- The Dynamism essay interactive migrated to `/i/dynamism-as-a-supercomputing-race-UxscdlvqRjn/`.
- A link to the original Cloudflare Worker build is retained in the essay and its Markdown archive entry.
- shadcn/ui’s Astro setup with Base UI powering the share popover.

## Commands

```sh
bun install
bun run dev
bun run build
bun run audit:seo
bun run preview
```

## Images

Assets are committed locally so the site is self-contained. The optional Cloudflare Images Transformations integration is disabled by default while the zone is being configured. After Cloudflare Image Transformations is enabled for `johnnyclee.com`, set:

```sh
PUBLIC_CLOUDFLARE_IMAGE_TRANSFORMS=true bun run build
```

When enabled, Markdown images and the migrated essay figures are emitted through `/cdn-cgi/image/` with automatic format selection, quality control, and lazy loading.
