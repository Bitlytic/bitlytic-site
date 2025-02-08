<script lang="ts">
    import Code from '../../../components/code.svelte';

	let {data} = $props();
</script>


<style lang="scss">
	@use "../../main.scss" as *;
</style>

<div class="main-page">
	<div class="main-text main-text__header main-text__header--title">
		{data.meta.title}
	</div>

	
	<div class="main-text">
		<iframe width="640" height="360" src={data.meta.link} title="How You Can Easily Make Your Code Simpler in Godot 4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</div>
	
	<div class="main-text main-text__description">
		<data.post/>
	</div>

</div>
