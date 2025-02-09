import { page } from "$app/state";
import type { VideoPost } from "$lib/post";
import type { RequestHandler } from "./$types";

export const prerender = true;

const site = 'https://bitlytic.dev'; // change this to reflect your domain
const pages: string[] = [
  '',
  "videos",
  "projects",
  "blogs"
]; // populate this with all the slugs you wish to include

const sitemap = (pages: string[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
	.map(
		(page) => `
  <url>
    <loc>${site}/${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  `
	)
	.join('')}
</urlset>`;

export const GET: RequestHandler = async () => {
  let allPages = pages;
  allPages.push(...getVideoPosts().map((post: string) => {return "post/video/" + post}));
  allPages.push(...getProjectPosts().map((post: string) => {return "post/video/" + post}));

	const body = sitemap(pages);
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
  
  

	return response;
}


function getVideoPosts() {
  let posts: string[] = [];

  const paths = import.meta.glob('/src/posts/video/*.md', { eager: true })

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      posts.push(slug);
    }
  }

  return posts;
}


function getProjectPosts() {
  let posts: string[] = [];

  const paths = import.meta.glob('/src/posts/project/*.md', { eager: true })

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      posts.push(slug);
    }
  }

  return posts;
}
