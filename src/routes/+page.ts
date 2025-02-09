import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { browser } from "$app/environment";

export const load: PageLoad = async ({fetch, params}) => {

	let videoPost = await import("/src/posts/video/composition-preview.md");

	let projectPost = await import("/src/posts/project/antworks-preview.md");

	// let blogPost = await import("/src/posts/video/composition-preview.md");

	return {
		videoPreview: videoPost.default,
		projectPreview: projectPost.default,
	};
}