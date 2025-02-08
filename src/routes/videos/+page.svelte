<script>

	let {data} = $props();

	console.log(data);
</script>

<style lang="scss">
	@use "../main.scss" as *;
</style>

<div class="main-page">
	<div class="main-text main-text__header main-text__header--title">
		Videos
	</div>

	{#each data.posts as post}
	<div>{post.title}</div>
	<a href={"/videos/" + post.slug}>View Post</a>
	{/each}

</div>