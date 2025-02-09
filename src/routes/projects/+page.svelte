<script>
	let { data } = $props();
</script>

<div class="main-page">
	<div class="main-text main-text__header main-text__header--title">
		Projects
	</div>

	<div class="main-text main-text__description main-text__description--centered">
		Here are <i>all</i> of the projects I've worked on (if I've added them all).
		A lot of these have never seen the light of day, but they deserve
		some words as they've made me the dev I am today.
	</div>
	<div class="main-text main-text__description main-text__description--centered">
		These range from projects I've done on stream to the smallest of mods
		for games people have never played.
	</div>

	<div class="project-grid">
		{#each data.posts as post}
			<div class="project-grid__item">
				<a class="project-grid__item-link" href={"post/project/" + post.slug}>
					<img
						class="project-grid__item-thumbnail"
						src={"/thumbnails/project/" + post.slug + ".png"}
					/>
				</a>
				<a class="project-grid__item-title" href={"post/project/" + post.slug}
					>{post.title}</a
				>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use "projects.scss" as *;
</style>
