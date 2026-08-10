// @ts-check

import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
import rehypeCloudflareImages from './src/lib/rehype-cloudflare-images.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://johnnyclee.com',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap(), react()],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeCloudflareImages] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
