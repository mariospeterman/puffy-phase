// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// Only use base path in production (GitHub Pages), not in development
const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
	site: 'https://mariospeterman.github.io',
	base: isProd ? '/puffy-phase' : '',
	outDir: './dist',
	build: {
		assets: 'assets',
	},
	integrations: [
		tailwind(),
		react()
	],
});
