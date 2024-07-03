<script lang="ts">
	import Form from '$lib/Form.svelte';

	import { page } from '$app/stores';
	import { notifier } from '@beyonk/svelte-notifications';
	import { goto } from '$app/navigation';
	import { user } from '../UserStore';
	import type { User } from '$lib/types';
	import { backendlink } from '../../config';

	const new_user: User = {
		name: '',
		room: {
			name: '',
			password: '',
		},
	};

	user.update((user) => {
		if (user) {
			new_user.name = user?.name ?? '';
			new_user.room.name = user?.room.name ?? '';
		}
		return user;
	});
	const room_name = $page.url.searchParams.get('name');
	new_user.room.name = room_name ?? new_user.room.name;

	const submit = () => {
		fetch(backendlink + '/validate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(new_user),
		})
			.then((res) =>
				res.text().then((data) => {
					if (res.ok) {
						notifier.success(data, 5000);
						user.set(new_user);
						goto('/room');
					} else notifier.danger(data, 5000);
				})
			)
			.catch((error) => {
				notifier.danger('failed to connect', 5000);
				console.error(error);
			});
	};
</script>

<main>
	<Form onsubmit={submit}>
		<h2>join a room</h2>
		<div>
			<label for="user-nam">display name:</label>
			<input
				required
				type="text"
				id="user-nam"
				bind:value={new_user.name}
				placeholder="people will see you as this"
			/>
		</div>
		<div>
			<label for="name">room name:</label>
			<input
				required
				type="text"
				id="name"
				bind:value={new_user.room.name}
				placeholder="double check!"
			/>
		</div>
		<div>
			<label for="password">password:</label>
			<input
				type="password"
				id="password"
				bind:value={new_user.room.password}
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
