<script lang="ts">
	import { onMount } from 'svelte';
	import {
		MessageStore,
		send_message,
		start_connection,
	} from './MessageStore';

	const submit = (event: any) => {
		const input = event.target.input;
		if (!input.value) return;
		send_message(input.value);
		input.value = '';
	};

	onMount(start_connection);
</script>

<main>
	<div class="chat">
		{#each $MessageStore as message}
			<div class="message">{message.content}</div>
			<div class="sender">{message.sender}:</div>
		{/each}
		<form on:submit|preventDefault={submit}>
			<input type="text" placeholder="send a message" id="input" />
			<button type="submit">send</button>
		</form>
	</div>
	<div class="participants">
		<h2>participants</h2>
		<div>test</div>
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 400px;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}
	.participants {
		border-left: solid #aaa 1px;
		display: flex;
		flex-direction: column;
		padding: 15px;
	}
	.participants h2 {
		text-align: center;
		margin: 10px 0 30px 0;
	}
	.participants > div {
		background-color: #f0f0f0;
		padding: 5px 15px;
		border-radius: 15px;
		display: flex;
		gap: 15px;
		align-items: center;
		font-size: 1.1em;
	}
	.participants > div::before {
		content: '';
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: rgb(123, 255, 47);
	}
	.chat {
		position: relative;
		display: flex;
		flex-direction: column-reverse;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: thin;
		padding: 15px;
		padding-bottom: 110px;
	}
	form {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		margin: 25px;
		background-color: #f0f0f0;
		border-radius: 25px;
		width: 70%;
		display: flex;
		gap: 10px;
		padding: 8px;
	}
	form input {
		width: 100%;
		font: inherit;
		background: transparent;
		border: none;
		border-radius: 10px;
		padding: 5px 10px;
	}
	input:focus {
		outline: none;
	}
	form button {
		font: inherit;
		background-color: #e3e3e3;
		border: none;
		border-radius: 20px;
		cursor: pointer;
		padding: 0 10px;
		color: #383838;
	}
	.message {
		background-color: #f0f0f0;
		border-radius: 18px;
		padding: 10px 20px;
		width: fit-content;
		max-width: 80%;
		margin-bottom: 3px;
	}
	.sender {
		padding: 0 8px;
		font-size: 16px;
		color: #383838;
		font-family: monospace;
		transform: translateY(2px);
		margin-top: 7px;
	}
</style>
