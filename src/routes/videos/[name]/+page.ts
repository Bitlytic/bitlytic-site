import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch, params}) => {
	let videoName = params.name;

	if (!videoName) {
		error(404, "Not found");
	}

	let test = await import(`../../../videos/${videoName}.md`);
	return {
		videoName: videoName,
		post: test.default
	};
}