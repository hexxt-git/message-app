<script lang="ts">
	import Nav from '$lib/Nav.svelte';
	import { NotificationDisplay } from '@beyonk/svelte-notifications';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		// @ts-ignore
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			// @ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
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

<NotificationDisplay />
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
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	:root::view-transition-old(root) {
		animation: 120ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
	}

	:root::view-transition-new(root) {
		animation: 350ms cubic-bezier(0, 0, 0.2, 1) 120ms both fade-in;
	}
</style>
