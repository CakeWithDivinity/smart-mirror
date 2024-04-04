<script lang="ts">
	import { WIDGET_ATTRIBUTES, type WidgetType } from '$lib/data/widgets';
	import { displayStore } from '$lib/stores/display-store';
	import DeleteWidget from '$lib/ui/modals/DeleteWidget.svelte';
	import Icon from '@iconify/svelte';
	import { openModal } from 'svelte-modals';
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

	function deleteWidget(position: number, widgetType: WidgetType | undefined) {
		if (!widgetType) {
			throw new Error('cannot delete widget without widgetType');
		}

		openModal(DeleteWidget, { widgetType, displayUuid: $display.uuid, widgetPosition: position });
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
		{#each $display.widgets as widget, index}
			{#if widget}
				<div class="widget-spot">
					<button class="delete-widget" on:click={() => deleteWidget(index, widget?.type)}>
						<Icon height="20" icon="material-symbols:delete-outline" />
					</button>
					<Icon height="48" icon={WIDGET_ATTRIBUTES[widget.type].icon} />
					<div class="widget-info">
						<p>{WIDGET_ATTRIBUTES[widget.type].name}</p>
						<button>
							<Icon height="20" icon="material-symbols:settings" />
						</button>
					</div>
				</div>
			{:else}
				<button
					class="empty-widget-spot"
					on:click={() => {
						if (!selectedWidget) {
							return;
						}

						displayStore.placeWidget($display.uuid, index, selectedWidget);
					}}
				></button>
			{/if}
		{/each}

		<a class="mirror-view" href={`/mirror-view/${$display.uuid}`}>Zur Spiegelansicht</a>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns: 20% 80%;
		min-height: 100vh;
		position: relative;
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

	.widget-spot {
		background-color: var(--primary);
		border-radius: 0.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;

		.delete-widget {
			align-self: end;
			background-color: transparent;
			color: var(--red);
		}

		.widget-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			font-weight: bold;

			button {
				background-color: transparent;
			}
		}
	}

	.mirror-view {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		background-color: var(--primary);
		padding: 0.5rem;
		border-radius: 0.5rem;
		font-weight: bold;
		box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.05);
	}
</style>
