<script lang="ts">
	import Form from '$lib/Form.svelte';
	import type { RoomQuery } from '$lib/types';
	const room_query: RoomQuery = {
		name: '',
		password: '',
	};
	let display_name = '';

	import { page } from '$app/stores';
	const name = $page.url.searchParams.get('name');
	room_query.name = name ?? '';

	const submit = () => {};
</script>

<main>
	<Form onsubmit={submit}>
		<h2>join a room</h2>
		<div>
			<label for="display_name">display name:</label>
			<input
				required
				type="text"
				id="name"
				bind:value={display_name}
				placeholder="people will see you as this"
			/>
		</div>
		<div>
			<label for="name">room name:</label>
			<input
				required
				type="text"
				id="name"
				bind:value={room_query.name}
				placeholder="double check!"
			/>
		</div>
		<div>
			<label for="password">password:</label>
			<input
				required
				type="password"
				id="password"
				bind:value={room_query.password}
				placeholder="be careful sharing this"
			/>
		</div>

		<input required type="submit" value="create" />
	</Form>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
		gap: 20px;
		padding: 40px;
		height: 100vh;
		box-sizing: border-box;
	}
</style>
