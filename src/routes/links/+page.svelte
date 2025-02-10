<script>

    import SocialLink from "../../components/social-link.svelte";

</script>
<style lang="scss">
	@use "links.scss" as *;
</style>


<div class="main-page">
	<div class="main-text main-text__header main-text__header--title">
		Links
	</div>

	<div class="main-text main-text__description social-page__links">
		<SocialLink title="GitHub" link="https://www.github.com/bitlytic"></SocialLink>
		<SocialLink title="YouTube" link="https://www.youtube.com/bitlytic"></SocialLink>
		<SocialLink title="Discord" link="https://discord.gg/skPc32bUfA"></SocialLink>
		<SocialLink title="Bluesky" link="https://bitlytic.bsky.social"></SocialLink>
		<SocialLink title="Twitter" link="https://twitter.com/Bitlytic"></SocialLink>
		<span style="color: var(--text-tertiary); font-size: var(--text-tiny); margin-top: 0;">When twitter.com stops working, I'm deleting my account</span>
	</div>
</div>