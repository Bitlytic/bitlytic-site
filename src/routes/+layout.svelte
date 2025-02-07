<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

	let { children } = $props();

	let darkMode = true;

	function toggleColorScheme(override: boolean | any = false) {


		if (override !== null) {
			darkMode = override;
		} else {
			darkMode = !darkMode;
		}

		window.sessionStorage.setItem("darkMode", darkMode);

		if (darkMode) {
            window.document.body.classList.remove("light");
            window.document.body.classList.add("dark");
        } else {
            window.document.body.classList.remove("dark");
            window.document.body.classList.add("light");
        }
	}

	function isDarkMode() {
		if (import.meta.env.SRR) {
			return false;
		}

		const sessionData = window.sessionStorage.getItem("darkMode");
		if (sessionData) {
			return "true" === sessionData;
		}

		return true;
	}

	if (browser) {
		toggleColorScheme(isDarkMode());
	}

</script>

<div class="navbar">
	<div class="navbar__icon">
		<a class="navbar__icon-logo" href="/">
			<img class="navbar__icon-logo navbar__icon-logo__picture" src="/crop.png" alt="Bitlytic"/>
		</a>
	</div>
	<div class="navbar__title">
		<a class="navbar__title-header" href="/">Bitlytic</a>
	</div>
	<hr class="navbar__separator"/>
	<div class="navbar__page">
		<div class="navbar__page-item">
			<a href="/videos">Videos</a>
		</div>
		<div class="navbar__page-item">
			<a href="/projects">Projects</a>
		</div>
		<div class="navbar__page-item">
			<a href="/projects">Blog</a>
		</div>
		<div class="navbar__page-item">
			<a href="/projects">Links</a>
		</div>
	</div>
</div>

<button onclick={() => {toggleColorScheme(null)}} class="toggle-dark-mode" aria-label="toggleDarkMode">
	Toggle Light Mode
</button>

<div class="page-content">
	{@render children()}
</div>

<style lang="scss">
	@use "../../static/global.scss" as *;
</style>
