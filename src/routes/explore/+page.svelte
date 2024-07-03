<script>
	import { backendlink } from '../../config';
</script>

<main>
	<h2>available public rooms</h2>
	{#await fetch(backendlink + '/public').then((res) => res.json()) then data}
		{#each data as room}
			<a href="/join?name={room.name}">
				<h3>
					{room.name}:
				</h3>
				{#each room.participants as participant}
					<span> {participant} </span>
				{/each}
			</a>
		{/each}
	{/await}
</main>

<style>
	main {
		padding: 20px;
		overflow-y: auto;
		height: 100vh;
		box-sizing: border-box;
	}
	a {
		padding: 20px;
		border-radius: 18px;
		border: solid #999 1px;
		background: none;
		cursor: pointer;
		width: 100%;
		text-align: start;
		font: inherit;
		display: flex;
		flex-wrap: wrap;
		margin: 20px 0;
		color: black;
		text-decoration: none;
	}
	h2 {
		text-align: center;
		margin-bottom: 80px;
	}
	h3 {
		font-size: 1.1em;
		margin: 0;
	}
	span {
		background-color: #f0f0f0;
		padding: 4px 12px;
		border-radius: 10px;
		margin-left: 10px;
		display: flex;
		align-items: center;
		width: fit-content;
		gap: 9px;
	}
	span::before {
		content: '';
		width: 10px;
		height: 10px;
		border-radius: 100%;
		background-color: greenyellow;
	}
</style>
