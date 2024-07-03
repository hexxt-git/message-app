<script lang="ts">
	import { goto } from '$app/navigation';
	import Form from '$lib/Form.svelte';
	import type { Room } from '$lib/types';
	import { notifier } from '@beyonk/svelte-notifications';
	const new_room: Room = {
		name: '',
		is_private: true,
		password: '',
	};
	const submit = () => {
		fetch(backendlink + '/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(new_room),
		}).then((res) => res.text().then((message)=>{
			if(res.ok) {
				notifier.success(message, 5000)
				setTimeout(()=>{
					goto(`/join?name=${new_room.name}`)
				}, 1000)
			}
			else notifier.danger(message, 5000)
		})).catch(error => {
			notifier.danger('failed to connect', 5000)
			console.error(error)
		});
	};
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
