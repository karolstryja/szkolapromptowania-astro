import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

export default defineConfig({
  // Example URL
  site: 'https://szkolapromptowania.pl',

  output: 'static',
  adapter: vercel(),
});