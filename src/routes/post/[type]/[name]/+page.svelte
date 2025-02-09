<script lang="ts">
	let {data} = $props();
</script>


<style lang="scss">
	@use "./post.scss" as *;
</style>

<div class="main-page">
	<div class="main-text main-text__header main-text__header--title">
		{data.meta.title}
	</div>

	{#if data.type === "video"}
		<div class="main-text">
			<iframe width="640" height="360" src={data.meta.link} title="How You Can Easily Make Your Code Simpler in Godot 4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
		</div>
	{/if}

	{#if data.type === "project"}
		<a class="main-text source-code" href={data.meta.sourceCode}>
			Source code
		</a>
	{/if}
	
	<div class="main-text main-text__description post-display">
		<data.post/>
	</div>

</div>
