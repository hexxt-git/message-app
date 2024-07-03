import { writable, type Writable } from 'svelte/store';
import { type Message, type User } from '$lib/types';
import { io } from 'socket.io-client';
import { participants, user } from '../UserStore';
import { notifier } from '@beyonk/svelte-notifications';
import { goto } from '$app/navigation';
import { backendlink } from '../../config';

export const MessageStore: Writable<Message[]> = writable([]);

const websocket = io(backendlink);
let user_instance: User | null = null;

export const start_connection = () => {
	user.update((user) => {
		user_instance = user;
		return user;
	});
	if (user_instance == null) {
		goto('/join');
		return;
	}

	websocket.emit('join', {
		username: user_instance?.name,
		...user_instance.room,
	});

	websocket.on('join success', () => {

		websocket.on('participants', (new_participants) => {
			participants.set(JSON.parse(new_participants));
		});

		websocket.on('message', (msg: string) => {
			const new_message = JSON.parse(msg);

			MessageStore.update((messages: Message[]) => {
				return [new_message, ...messages];
			});
		});
	});

	websocket.on('join fail', () => {
		notifier.danger('failed to join room', 5000);
		console.error('failed to join room');
	});
};

export const send_message = (msg: string) => {
	const message_object: Message = {
		content: msg,
		sender: user_instance?.name ?? 'unknown',
	};

	const new_message = JSON.stringify(message_object);

	websocket.emit('message', new_message);
};

export const end_connection = () => {
	// websocket.disconnect()
};
