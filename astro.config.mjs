import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import relativeLinks from 'astro-relative-links';

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'directory',
  },
  integrations: [react(), relativeLinks()],
});
