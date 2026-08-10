# personal_website

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
bun run build:cloudflare
bun run audit:seo
bun run audit:cloudflare
bun run preview
```

## Cloudflare Workers

The site deploys as pre-rendered Workers Static Assets; no SSR adapter or Worker
entry point is required. Wrangler is pinned in `devDependencies`, and
`wrangler.jsonc` points at the generated `dist/` directory.

```sh
bun run deploy:dry-run
bun run deploy:cloudflare
```

For Cloudflare Workers Builds, use `bun run build:cloudflare` as the build
command and `bun run deploy` as the deploy command. Set the build variable
`BUN_VERSION=1.3.14` to match the repository toolchain. Test the generated
`workers.dev` URL before attaching `johnnyclee.com` as the production custom
domain.

## Images

Assets are committed locally so the site is self-contained. Cloudflare Image
Transformations are enabled for `johnnyclee.com`; production builds opt in with:

```sh
PUBLIC_CLOUDFLARE_IMAGE_TRANSFORMS=true bun run build
```

When enabled, Markdown images and the migrated essay figures are emitted through `/cdn-cgi/image/` with automatic format selection, quality control, and lazy loading.
