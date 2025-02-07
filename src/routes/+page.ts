import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { browser } from "$app/environment";

export const load: PageLoad = async ({fetch, params}) => {

	
	let videoPreview = "composition";

	let codeHolder : HTMLDivElement;

	let postText;

	postText = await fetch("videos/composition.md").then(x => x.text());

	return {
		videoPreview: await postText
	};
}