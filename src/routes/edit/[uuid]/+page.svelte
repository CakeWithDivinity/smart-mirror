<script lang="ts">
	import { WIDGET_ATTRIBUTES, type WidgetType } from '$lib/data/widgets';
	import Icon from '@iconify/svelte';
	export let data;
	const display = data.display;

	let selectedWidget: WidgetType | undefined = undefined;

	function selectWidget(key: string) {
		if (selectedWidget === key) {
			selectedWidget = undefined;
		} else {
			selectedWidget = key as WidgetType;
		}
	}
</script>

<div class="wrapper">
	<div class="sidebar">
		<h1>{$display.name}</h1>

		<div class="widgets">
			{#each Object.entries(WIDGET_ATTRIBUTES) as [key, widget]}
				<button
					class="widget"
					class:selected={selectedWidget === key}
					on:click={() => selectWidget(key)}
				>
					<div class="icon-wrapper">
						<Icon height="48" icon={widget.icon} />
					</div>
					<p>{widget.name}</p>
				</button>
			{/each}
		</div>
	</div>
	<div class="preview">
		{#each $display.widgets as widget}
			{#if widget}
				<div class="widget-spot">
					<Icon height="48" icon={widget.icon} />
					<div>{widget.name}<button><Icon icon="material-symbols:settings" /></button></div>
					<button><Icon icon="material-symbols:delete-outline" /></button>
				</div>
			{:else}
				<div class="empty-widget-spot"></div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns: 20% 80%;
		min-height: 100vh;
	}

	.sidebar {
		background-color: var(--primary);
		height: 100%;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.2);

		h1 {
			font-size: 1.5rem;
			text-decoration: underline;
			margin-bottom: 2rem;
		}
	}

	.widgets {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		gap: 3rem;

		> button {
			background-color: transparent;
			padding: 1rem;
			border: 2px solid transparent;

			&.selected {
				border: 2px solid blue;
			}
		}
	}

	.widget {
		text-align: center;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.icon-wrapper {
		background-color: var(--white);
		aspect-ratio: 1 / 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.5rem;
		box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.05);
	}

	.preview {
		display: grid;
		grid-template-columns: repeat(4, 10rem);
		grid-template-rows: repeat(3, 10rem);
		gap: 5rem;
		justify-self: center;
		align-self: center;
	}

	.empty-widget-spot {
		background-color: var(--gray);
	}
</style>
