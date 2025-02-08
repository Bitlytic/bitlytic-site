import { json } from "@sveltejs/kit";

async function getVideos() {
	let posts = []

	const paths = import.meta.glob('/src/videos/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<any, 'slug'>;
			const post = {...metadata, slug};
			posts.push(post);
		}
	}

	return posts;
}


export async function GET() {
	const posts = await getVideos();
	return json(posts);
}