<script lang="ts">
    import { onMount } from "svelte";
	import {Markdown} from 'svelte-exmarkdown';

	let {post} = $props();
	let path = post + ".md";

	let md = $state('Loading Content');

	let codeHolder : HTMLDivElement;

	const loadItems = async() => { 
			const postText = await fetch(path).then(x => x.text());
			md = postText;
	};

	onMount(() => {
		loadItems();
	});

</script>


<div bind:this={codeHolder}>
	<Markdown md={md}></Markdown>
</div>