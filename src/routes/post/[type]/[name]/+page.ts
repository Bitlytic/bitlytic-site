import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";


export const load: PageLoad = async ({fetch, params}) => {


	let typeName = params.type;

	let path = "/src/posts/";

	path += typeName;

	let postName = params.name;
	
	if (!postName) {
		error(404, "Not found");
	}
	
	path += "/" + postName + ".md"
	// Maybe this isn't the best, most reliable piece of code but...
	// TODO: Wrap this in a try/catch and spit out 404 after dev
	let md = await import(/* @vite-ignore */ path);

	return {
		post: md.default,
		meta: md.metadata,
		type: typeName,
	};
}