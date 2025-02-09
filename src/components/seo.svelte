<script lang="ts">
	import {page} from "$app/state";

	let title = "Bitlytic's Space";
	let description = "A feesh's yap site about software and game dev.";
	let image = "https://bitlytic.dev/vaporeon.png";
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og_site_name" content="bitlytic.dev" />
	<meta
	  property="og:url"
	  content="https://bitlytic.dev{page.url.pathname.toString()}"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
  
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="bitlytic.dev" />
	<meta
	  property="twitter:url"
	  content="https://bitlytic.dev{page.url.pathname.toString()}"
	/>
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
  
	{@html `<script type="application/ld+json">{
	 "@context": "https://schema.dev",
	 "@type": "Website",
	 "name": "${title}",
	 "url": "https//bitlytic.dev${page.url.pathname.toString()}",
	 "logo": ${image}  }</script>`}
</svelte:head>
