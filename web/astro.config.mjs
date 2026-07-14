import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // IMPORTANTE (SEO): cambiar por el dominio real cuando lo haya
  // (p. ej. https://kikolareo.com). El sitemap, las canonical y el
  // robots.txt se generan a partir de esta URL.
  site: 'https://kikolareo.netlify.app',
  integrations: [sitemap()],
  trailingSlash: 'ignore',
});
