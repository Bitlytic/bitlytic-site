import type { VideoPost } from "$lib/post";

export async function load({ fetch }: any) {
	let posts: VideoPost[] = []

	const paths = import.meta.glob('/src/posts/video/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<VideoPost, 'slug'>;
			if (metadata.preview || !metadata.published) {
				continue;
			}

			const post = { ...metadata, slug };
			posts.push(post);
		}
	}

	posts = posts.sort((a, b) => { 
		return (new Date(b.videoDate).getTime() - new Date(a.videoDate).getTime()); 
	});

	return { posts }
};