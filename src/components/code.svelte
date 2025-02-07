<script lang="ts">
    import { onMount } from "svelte";
	import {Markdown} from 'svelte-exmarkdown';

	let {post, limit = 0}: {post: string, limit?: number | string} = $props();
	
	
	let parsed = 0;
	if (typeof limit === 'string') {
		parsed = parseInt(limit);
	} else {
		parsed = limit
	}
	
	let shouldLimit = false;

	if (limit && post.length > parsed) {
		shouldLimit = true
	}

	if (parsed) {
		post = post.substring(0, parsed);
		post = post.trim();
		post += "...";
	}

	let md = $state(post);

</script>


<div>
	<Markdown md={md}></Markdown>
	{#if limit}
		<a href="videos/composition">
			Read full post
		</a>
	{/if}
</div>