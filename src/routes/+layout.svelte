<script lang="ts">
	let { children } = $props();
</script>

<div class="navbar">
	<div class="navbar__icon">
		<img class="navbar__icon-logo" src="crop.png"/>
	</div>
	<div class="navbar__title">
		<a class="navbar__title-header" href="./">Bitlytic</a>
	</div>
	<hr class="navbar__separator"/>
	<div class="navbar__page">
		<div class="navbar__page-item">
			<a href="./videos">Videos</a>
		</div>
		<div class="navbar__page-item">
			<a href="./projects">Projects</a>
		</div>
		<div class="navbar__page-item">
			<a href="./projects">Blog</a>
		</div>
		<div class="navbar__page-item">
			<a href="./projects">Links</a>
		</div>
	</div>
</div>

<div class="page-content">
	{@render children()}
</div>

<style lang="scss">
	@use "../../static/global.scss" as *;
</style>
