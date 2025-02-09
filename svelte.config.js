import { createHighlighter } from '@svelte-dev/pretty-code';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import {mdsvex} from 'mdsvex';

const mdsvexOptions = {
	extensions: ['.md'],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	extensions: [".svelte", ".md"],

	preprocess: [
		mdsvex({
			// The default mdsvex extension is .svx; this overrides that.
			extensions: [".md"],
			
			
		}),
		vitePreprocess(),
	],
	highlight: {
		highlighter: createHighlighter({
			theme: {
				dark: 'github-dark',
				light: 'github-light'
			}
		})
	},
	compilerOptions: {runes: true},
	kit: {
		adapter: adapter({
			fallback: '404.html',
			paths: {
				base: "/bitlytic-site"
			}
		}),
	}
};

export default config;