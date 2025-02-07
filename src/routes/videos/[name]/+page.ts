import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch, params}) => {
	let videoName = params.name;

	if (!videoName) {
		error(404, "Not found");
	}

	let test = await import("../../../videos/composition.md");
	console.log(test.default);
	let postText = await fetch(`/videos/${videoName}.md`).then(x => x.text());

	return {
		videoName: videoName,
		postText: postText,
		test: test.default
	};
}