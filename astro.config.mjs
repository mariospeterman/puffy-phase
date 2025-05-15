// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://mariospeterman.github.io',
	base: '/puffy-phase',
	outDir: './docs',  // GitHub Pages can serve from /docs folder
	build: {
		assets: 'assets',
	},
	integrations: [
		tailwind(),
		react()
	],
});
