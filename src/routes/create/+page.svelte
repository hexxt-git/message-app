<script lang="ts">
	import Form from '$lib/Form.svelte';
	import type { Room } from '$lib/types';
	const new_room: Room = {
		name: '',
		is_private: true,
		password: '',
		max_participants: 100,
	};
	const submit = () => {};
</script>

<main>
	<Form onsubmit={submit}>
		<h2>create a room</h2>
		<div>
			<label for="name">room name:</label>
			<input
				required
				type="text"
				id="name"
				bind:value={new_room.name}
				placeholder="give a name to your room"
			/>
		</div>
		<div>
			<label for="is-private">private room:</label>
			<input
				required
				type="checkbox"
				id="is-private"
				bind:checked={new_room.is_private}
			/>
		</div>
		{#if new_room.is_private}
			<div>
				<label for="password">room password:</label>
				<input
					required
					type="password"
					id="password"
					bind:value={new_room.password}
					placeholder="be careful sharing this"
				/>
			</div>
		{/if}
		<div>
			<label for="max-participants">max participants:</label>
			<input
				required
				type="range"
				min="2"
				max="100"
				step="1"
				bind:value={new_room.max_participants}
				id="max-participants"
			/>
			<span>
				{new_room.max_participants < 100
					? new_room.max_participants
					: '∞'}
			</span>
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
