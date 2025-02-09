<script lang="ts">
	import "./app.scss";
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

	let accentColors : string[] = [
		"blurple",
		"yorange",
		"pred",
		"shamrock",
	]

	let currentColor: string;

	function changeAccent() {
		let index = accentColors.findIndex((x) => x == currentColor);
		index = (index + 1) % accentColors.length;
		currentColor = accentColors[index];

		window.localStorage.setItem("accentColor", currentColor);
		applyColor();
	}
	
	function loadColor() {		
		const sessionData = window.localStorage.getItem("accentColor");	
		if (typeof sessionData === "string") {
			currentColor = sessionData;
		}

		if (!currentColor) {
			currentColor = accentColors[0];
		}
	}

	function applyColor() {
		// Secret... shhh....
		window.document.body.classList.remove("godot");

		for (let color of accentColors) {
			window.document.body.classList.remove(color);
		}
		window.document.body.classList.add(currentColor);

	}

	function changeToSecretAccent() {
		currentColor = "godot";

		applyColor();
	}


	let { children } = $props();

	let darkMode = true;

	function toggleColorScheme(override: boolean | any = false) {


		if (override !== null) {
			darkMode = override;
		} else {
			darkMode = !darkMode;
		}

		window.localStorage.setItem("darkMode", darkMode);

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

		const sessionData = window.localStorage.getItem("darkMode");
		if (sessionData) {
			return "true" === sessionData;
		}

		return true;
	}

	if (browser) {
		toggleColorScheme(isDarkMode());
		loadColor();
		applyColor();
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
			<a href="/blogs">Blog</a>
		</div>
		<div class="navbar__page-item">
			<a href="/links">Links</a>
		</div>
	</div>
</div>

<div class="navbar__color-controls">
	<button onclick={() => {toggleColorScheme(null)}} class="navbar__color-controls__button" aria-label="toggleDarkMode">
		Toggle Light Mode
	</button>
	
	<button onclick={() => {changeAccent()}} ondblclick={() => {changeToSecretAccent();}} class="navbar__color-controls__button" aria-label="changeAccent">
		Change Color
	</button>
</div>

<div class="page-content">
	{@render children()}
</div>

<style lang="scss">
	@use "/static/global.scss" as *;
</style>
