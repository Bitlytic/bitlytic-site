export async function load({fetch}: any) {
	const response = await fetch('api/videos');
	const posts = await response.json();

	return {posts}
};