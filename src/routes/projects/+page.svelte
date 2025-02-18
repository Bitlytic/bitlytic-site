<script lang="ts">
	type postSortFunc = (a: ProjectPost, b: ProjectPost) => number;

    import type { ProjectPost } from '$lib/post.js';
    import { onMount } from 'svelte';

	let { data } = $props();

	let posts = $state(data.posts);

	let asc_sort = $state(false);

	let sort_post_date = (a: ProjectPost, b: ProjectPost) => {return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();};
	let sort_create_date = (a: ProjectPost, b: ProjectPost) => {return new Date(b.createDate).getTime() - new Date(a.createDate).getTime();};
	let sort_alphabetical = (a: ProjectPost, b: ProjectPost) => {return a.title.localeCompare(b.title);};
	let last_sort_func : postSortFunc | undefined = $state();

	// This honestly feels so gross but I can't figure out how to do typescript classes in svelte...
	function sort_posts(sort_func: postSortFunc) {
		posts = posts.sort(sort_func);

		if (sort_func === last_sort_func) {
			if (asc_sort) {
				posts = posts.reverse();
				asc_sort = false;
			} else {
				asc_sort = true;
			}
			return;
		}

		last_sort_func = sort_func;
		asc_sort = true;
	}

	function getFormattedDate(dateString: string): string {
		let date = new Date(dateString);

		const dateOptions: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long'
		};

		return date.toLocaleDateString("en-us", dateOptions);
	}

	// Select default sort
	last_sort_func = sort_post_date;
	sort_posts(last_sort_func);

</script>

<div class="main-page">
	<div class="main-text main-text__header main-text__header--title">
		Projects
	</div>

	<div class="main-text main-text__description main-text__description--centered">
		Here are a ton of projects I've worked on.
		A lot of these have never seen the light of day, but they deserve
		some words as they've made me the dev I am today.
	</div>
	<div class="main-text main-text__description main-text__description--centered">
		These range from things I've done on stream to the smallest of mods
		for unknown games.
	</div>

	<div class="project-sort-controls">
		<span>Sort by: </span>
		<button onclick={() => sort_posts(sort_post_date)} class="project-sort-controls__button">
			Post Date 
			{#if last_sort_func == sort_post_date}
				{#if asc_sort}
					▼
				{/if}
				{#if !asc_sort}
					▲
				{/if}
			{/if}
		</button>
		<button onclick={() => sort_posts(sort_create_date)} class="project-sort-controls__button">
			Project Date
			{#if last_sort_func == sort_create_date}
				{#if asc_sort}
					▼
				{/if}
				{#if !asc_sort}
					▲
				{/if}
			{/if}
		</button>
		<button onclick={() => sort_posts(sort_alphabetical)} class="project-sort-controls__button">
			Alphabetical
			{#if last_sort_func == sort_alphabetical}
				{#if asc_sort}
					▼
				{/if}
				{#if !asc_sort}
					▲
				{/if}
			{/if}
		</button>
	</div>

	<div class="project-grid">
		{#each posts as post}
			{@const postLink = "post/project/" + post.slug}
			<div class="project-grid__item">
				<a class="project-grid__item-link" href={postLink}>
					<img
						class="project-grid__item-thumbnail"
						src={"/thumbnails/project/" + post.slug + ".png"}
					/>
				</a>
				<a class="project-grid__item-title" href={postLink}>
					{post.title}
				</a>
				<a class="project-grid__item-title__date" href={postLink}>{getFormattedDate(post.createDate)}</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use "projects.scss" as *;
</style>
