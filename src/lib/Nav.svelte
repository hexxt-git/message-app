<!-- TODO: fix the finder obstructing shit -->
<script lang="ts">
	let show: boolean = false;
	let navRef: HTMLElement | undefined = undefined;

	function handleMouseLeave(event: MouseEvent) {
		if (!navRef || !event.relatedTarget || !navRef.contains(event.relatedTarget as Node)) {
			show = false;
		}
	}
</script>

<nav
	bind:this={navRef}
	class={show ? '' : 'hidden'}
	on:mouseenter={(event) => (show = true)}
	on:mouseleave={handleMouseLeave}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="finder"></div>
	<a href="/">home</a>
	<a href="/create">create</a>
	<a href="/join">join</a>
	<a href="/explore">explore</a>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		right: 20%;
		border: solid #999 1px;
		border-top: none;
		padding: 12px 30px;
		border-radius: 0 0 15px 15px;
		display: flex;
		gap: 15px;
		transform: translateY(0);
		transition: transform 300ms ease;
		background-color: #fffe;
		z-index: 1;
	}
	.hidden {
		transform: translateY(calc(-100% + 15px));
	}
	a {
		cursor: pointer;
		font-size: 18px;
		color: black;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	.finder {
		position: absolute;
		top: 0;
		left: -75%;
		width: 250%;
		height: 200px;
		z-index: -1;
	}
</style>