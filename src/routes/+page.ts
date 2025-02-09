import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { browser } from "$app/environment";

export const load: PageLoad = async ({fetch, params}) => {

	let accentColors : string[] = [
		"blurple",
		"yorange",
		"pred",
		"shamrock",
	]

	function loadColor() {		
		const sessionData = window.localStorage.getItem("accentColor");	
		if (typeof sessionData === "string") {
			window.document.body.classList.remove("godot");
		
			for (let color of accentColors) {
				window.document.body.classList.remove(color);
			}
			window.document.body.classList.add(sessionData);
		}
	}

	if (browser) {
		loadColor();
	}

	let videoPost = await import("/src/posts/video/composition-preview.md");

	let projectPost = await import("/src/posts/project/antworks-preview.md");

	// let blogPost = await import("/src/posts/video/composition-preview.md");

	return {
		videoPreview: videoPost.default,
		projectPreview: projectPost.default,
	};
}