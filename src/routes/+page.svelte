<script>
	let {data} = $props();
</script>

<style lang="scss">
	@use "main.scss" as *;
</style>

<div class="main-page">
	<div class="main-text main-text__header">
		Check out a youtube video:
	</div>

	<div class="main-text">
		<iframe class="main-text__video" width="640" height="360" src="https://www.youtube.com/embed/74y6zWZfQKk" title="How You Can Easily Make Your Code Simpler in Godot 4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</div>
	
	<div class="main-text main-text__description">
		<data.videoPreview/>
	</div>
	
	<a class="main-text main-text__read-more" href="post/video/composition">
		Read full post
	</a>

	<hr class="main-text__divider"/>

	<div class="main-text main-text__header">
		Or a project:
	</div>

	<div class="main-text main-text__description">
		<data.projectPreview/>
	</div>

	<a class="main-text main-text__read-more" href="post/project/antworks">
		Read full post
	</a>
</div>
