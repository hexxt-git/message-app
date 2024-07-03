<script lang="ts">
	import Nav from "$lib/Nav.svelte";
</script>

<header>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="true"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
		rel="stylesheet"
	/>
</header>

<Nav />
<slot />

<style>
	:global(body) {
		min-height: 100vh;
		margin: 0;
		box-sizing: border-box;
		font-family: Nunito, sans-serif;
		font-size: 18px;
	}
</style>
