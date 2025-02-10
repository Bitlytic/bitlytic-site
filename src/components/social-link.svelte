
<script lang="ts">
	let {children, title, link}: {children?: any, title: string, link: string} = $props();
</script>

<div>
	{title}: 
	<a class="social-page__link-item" href={link}>
		{link}
	</a>
	{@render children?.()}
</div>