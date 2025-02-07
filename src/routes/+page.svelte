<script>
    import Code from "../components/code.svelte";

	let {data} = $props();
	console.log(data);
</script>

<style lang="scss">
	@use "main.scss" as *;
</style>

<div class="main-page">
	<div class="main-text main-text__header">
		Check out a youtube video:
	</div>

	<div class="main-text">
		<iframe width="640" height="360" src="https://www.youtube.com/embed/74y6zWZfQKk" title="How You Can Easily Make Your Code Simpler in Godot 4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</div>
	
	<div class="main-text main-text__description">
		<Code post={data.videoPreview} limit=500></Code>
	</div>

	<hr class="main-text__divider"/>

	<div class="main-text main-text__header">
		Or a project:
	</div>


	<div class="main-text main-text__header">
		Or a blog post:
	</div>


	<div class="main-text">
		Nostra dis cubilia eget platea; rutrum id mollis. Pellentesque eu in bibendum condimentum, imperdiet mus felis scelerisque. Montes enim id pharetra nascetur maximus. Ajusto cras, ultricies integer himenaeos platea urna vivamus. Parturient semper quam ante efficitur odio. Et nulla penatibus turpis; maecenas quis dictum. Semper congue ridiculus egestas; litora consectetur tellus. Quisque dictum ante laoreet nostra nulla placerat orci viverra. Non gravida rhoncus ultricies in eget per suscipit.
	</div>

</div>
