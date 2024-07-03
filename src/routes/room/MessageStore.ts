import { writable, type Writable } from 'svelte/store';
import { type Message } from '$lib/types';
import { io } from 'socket.io-client';

export const MessageStore: Writable<Message[]> = writable([]);

const websocket = io('http://localhost:3000');
const username = Math.floor(Math.random() * 1e12);

export const start_connection = () => {
	websocket.emit('join', 'coolkids');

	websocket.on('chat', (msg: string) => {
		const new_message = JSON.parse(msg);
		// console.log(new_message);

		MessageStore.update((messages: Message[]) => {
			return [new_message, ...messages];
		});
	});
};

export const send_message = (msg: string) => {
	const message_object: Message = {
		content: msg,
		sender: username + '',
	};

    // sender can't see his own message 
	MessageStore.update((messages: Message[]) => {
		return [message_object, ...messages];
	});

	const new_message = JSON.stringify(message_object);

	websocket.emit('chat', {
		room: 'coolkids',
		message: new_message,
	});
};
