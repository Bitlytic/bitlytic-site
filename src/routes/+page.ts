import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { browser } from "$app/environment";

export const load: PageLoad = async ({fetch, params}) => {

	let post = await import("../videos/composition-preview.md");

	return {
		videoPreview: post.default
	};
}