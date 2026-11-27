// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://olivermann.studio',
  integrations: [sitemap()],
  // Old post addresses that now point to a newer post
  redirects: {
    '/blog/innovation-ubc-newsletters/': '/blog/launching-innovation-ubc-monthly-newsletter/',
  },
});
