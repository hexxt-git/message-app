<script lang="ts">
	export let onsubmit = () => {};
</script>

<form on:submit|preventDefault={onsubmit} class="form">
	<slot />
</form>

<style>
	/* im still experimenting and learning svelte idk if this is the best method */
	form {
		border-radius: 30px;
		border: solid #999 1px;
		padding: 20px;
		min-width: 420px;
		font-size: 18px;
        flex-direction: column;
	}
	.form :global(h2) {
		margin: 0 0 15px 0;
		width: 100%;
		text-align: center;
		font-size: 1.3em;
	}
	.form :global(label) {
		white-space: nowrap;
		font-weight: bold;
	}
	.form :global(div) {
		background-color: #f0f0f0;
		padding: 10px 20px;
		border-radius: 18px;
		margin: 0 0 10px 0;
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 10px;
	}
	.form :global(input[type='text']),
	.form :global(input[type='password']) {
		color: #333;
		font-family: inherit;
		font-size: inherit;
		min-width: 30px;
		width: 100%;
		border-radius: 10px;
		border: solid 1px #ccc;
		padding: 3px 5px 3px 7px;
	}
	.form :global(input[type='checkbox']) {
		appearance: none;
		width: 55px;
		height: 30px;
		border-radius: 100px;
		border: 1px solid #ccc;
		outline: none;
		cursor: pointer;
		background-color: #fff;
		transition: background 300ms ease;
		padding: 3px;
		box-sizing: border-box;
		margin: 0;
		margin-left: auto;
	}
	.form :global(input[type='checkbox']:before) {
		content: '';
		display: block;
		height: 100%;
		aspect-ratio: 1/1;
		border-radius: 50%;
		background-color: #333;
		transition:
			transform 300ms ease,
			background 300ms ease;
		transform: translateX(0);
	}
	.form :global(input[type='checkbox']:checked) {
		background-color: #333;
	}
	.form :global(input[type='checkbox']:checked::before) {
		background-color: #fff;
		transform: translateX(calc(55px - 30px));
	}
	.form :global(input:focus),
	.form :global(input[type='checkbox']:focus) {
		outline: none;
		border: solid lightskyblue 1px;
	}
	.form :global(input[type='range']) {
		appearance: none;
		-webkit-appearance: none;
		width: 100%;
		height: 8px;
		border-radius: 100px;
		border: 1px solid #ccc;
		outline: none;
		cursor: pointer;
		background-color: #fff;
		padding: 3px;
		box-sizing: border-box;
	}
	.form :global(input[type='range']::-webkit-slider-thumb) {
		appearance: none;
		-webkit-appearance: none;
		appearance: none;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: #333;
		cursor: pointer;
	}
	.form :global(span) {
		font-weight: bold;
		font-size: 16px;
	}
	.form :global(input[type='submit']) {
		width: 100%;
		padding: 10px;
		background-color: #333;
		color: white;
		font-size: inherit;
		font-family: inherit;
		border-radius: 18px;
		border: none;
		box-sizing: border-box;
        margin-top: 30px;
        cursor: pointer;
    }
	.form :global(input[type='submit']:hover) {
        background-color: #363636;
	}
    .form :global(input[type='submit']:focus) {
		outline: solid lightskyblue 1px;
	}
</style>
