<script>

	let {data} = $props();
</script>

<style lang="scss">
	@use "videos.scss" as *;
</style>

<div class="main-page">
	<div class="main-text main-text__header main-text__header--title">
		Videos
	</div>

	<div class="main-text main-text__description main-text__description--centered">
		Here are the videos I feel are worth speaking on. Clicking on any of them will take you to a page where you can read an associated post about why that video came to be or any additional notes I feel were cool to include.
	</div>

	<div class="video-grid">
		{#each data.posts as post}
		<div class="video-grid__item">
			<a class="video-grid__item-link" href={"post/video/" + post.slug}>
				<img class="video-grid__item-thumbnail {post.published ? '' : 'wip'}" src={"/thumbnails/video/" + post.slug + ".webp"}/>
			</a>
			<a class="video-grid__item-title {post.published ? '' : 'wip'}" href={"post/video/" + post.slug}>{post.title}</a>
			{#if !post.published}
			<p class="video-grid__item-wip">Coming soon™</p>
			{/if}
		</div>
		{/each}
	</div>	

</div>