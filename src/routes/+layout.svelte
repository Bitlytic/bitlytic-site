<script lang="ts">
	import "./app.scss";
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
	import NavbarIcon from "../components/navbar-icon.svelte";

	let accentColors : string[] = [
		"blurple",
		"yorange",
		"pred",
		"shamrock",
	]

	let currentColor: string;

	let isDoubleClick = $state(false);
	let currentDoubleClick: number;


	function changeAccent() {
		if (isDoubleClick) {
			changeToSecretAccent();
			isDoubleClick = false;
			return;
		}

		let index = accentColors.findIndex((x) => x == currentColor);
		index = (index + 1) % accentColors.length;
		currentColor = accentColors[index];

		window.localStorage.setItem("accentColor", currentColor);
		applyColor();
		isDoubleClick = true;
		clearTimeout(currentDoubleClick);
		currentDoubleClick = setTimeout(() => {
			isDoubleClick = false;
		}, 150);

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

		window.localStorage.setItem("darkMode", darkMode.toString());

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
		<a class="navbar__title-header navbar__page-link" href="/">Bitlytic</a>
	</div>
	<hr class="navbar__separator"/>
	<div class="navbar__page">
		<div class="navbar__page-item">
			<a class="navbar__page-link" href="/videos">Videos</a>
		</div>
		<div class="navbar__page-item">
			<a class="navbar__page-link" href="/projects">Projects</a>
		</div>
		<div class="navbar__page-item">
			<a class="navbar__page-link" href="/blogs">Blog</a>
		</div>
		<div class="navbar__page-item">
			<a class="navbar__page-link" href="/links">Links</a>
		</div>
	</div>
</div>

<div class="mobile-navbar">
	<div class="mobile-navbar__icon">
		<a class="mobile-navbar__icon-svg" href="/">
			<NavbarIcon width="24px" height="24px" svgName="home"></NavbarIcon>
		</a>
		<a href="/">
			Home
		</a>
	</div>
	<div class="mobile-navbar__icon">
		<a class="mobile-navbar__icon-svg" href="/videos">
			<NavbarIcon width="24px" height="24px" svgName="camera"></NavbarIcon>
		</a>
		<a href="/videos">
			Videos
		</a>
	</div>
	<div class="mobile-navbar__icon">
		<a class="mobile-navbar__icon-svg" href="/projects">
			<NavbarIcon width="24px" height="24px" svgName="controller"></NavbarIcon>
		</a>
		<a href="/projects">
			Projects
		</a>
	</div>
	<div class="mobile-navbar__icon">
		<a class="mobile-navbar__icon-svg" href="/links">
			<NavbarIcon width="24px" height="24px" svgName="socials"></NavbarIcon>
		</a>
		<a href="/links">
			Links
		</a>
	</div>
	<div class="mobile-navbar__icon">
		<button onclick={changeAccent} class="mobile-navbar__button mobile-navbar__icon-svg" >
			<NavbarIcon width="24px" height="24px" svgName="palette"></NavbarIcon>
		</button>
		<button onclick={changeAccent} class="mobile-navbar__button mobile-navbar__text">
			Color
		</button>
	</div>
</div>

<div class="navbar__color-controls">
	<button onclick={() => {toggleColorScheme(null)}} class="navbar__color-controls__button" aria-label="Toggle Dark Mode">
		Toggle Light Mode
	</button>
	
	<button onclick={() => {changeAccent()}} class="navbar__color-controls__button" aria-label="Change Accent Color">
		Change Color
	</button>
</div>

<div class="page-content">
	{@render children()}
</div>

<style lang="scss">
	@use "/static/global.scss" as *;
</style>
