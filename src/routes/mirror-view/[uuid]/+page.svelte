<script lang="ts">
	import CalendarWidget from '$lib/ui/widgets/CalendarWidget.svelte';
	import NewsWidget from '$lib/ui/widgets/NewsWidget.svelte';
	import WeatherWidget from '$lib/ui/widgets/WeatherWidget.svelte';

	export let data;

	let display = data.display;
</script>

<div class="mirror-view">
	{#each $display.widgets as widget}
		<div>
			{#if widget}
				<!-- svelte's type inference breaks here if we use <svelte:component :( -->
				<!-- gotta live with this for now -->
				{#if widget.type === 'weather'}
					<WeatherWidget {widget} />
				{:else if widget.type === 'news'}
					<NewsWidget {widget} />
				{:else if widget.type === 'calendar'}
					<CalendarWidget {widget} />
				{/if}
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.mirror-view {
		height: 100vh;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(3, 1fr);
		background-color: var(--black);
		color: var(--white);
		padding: 2rem;
		gap: 2rem;
	}
</style>
