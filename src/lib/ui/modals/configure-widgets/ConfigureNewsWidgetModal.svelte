<script lang="ts">
	import type { NewsWidget } from '$lib/data/widgets';
	import { displayStore } from '$lib/stores/display-store';
	import { closeModal } from 'svelte-modals';
	import BaseModal from '../BaseModal.svelte';

	export let widget: NewsWidget;
	export let isOpen: boolean;
	export let displayUuid: string;
	export let position: number;

	// Available options for categories and countries
	const categories = [
		'business',
		'entertainment',
		'general',
		'health',
		'science',
		'sports',
		'technology',
	];
	const countries = ['us', 'de', 'fr', 'gb', 'it', 'jp', 'ru', 'cn'];

	function saveWidgetData() {
		displayStore.updateWidget(displayUuid, position, widget);
		closeModal();
	}
</script>

<BaseModal {isOpen}>
	<div class="config-form" slot="content">
		<label>
			API Key:
			<input type="text" bind:value={widget.apiKey} />
		</label>
		<label>
			Category:
			<select bind:value={widget.category}>
				{#each categories as cat}
					<option value={cat}>{cat}</option>
				{/each}
			</select>
		</label>
		<label>
			Country:
			<select bind:value={widget.country}>
				{#each countries as cnt}
					<option value={cnt}>{cnt}</option>
				{/each}
			</select>
		</label>
	</div>
	<svelte:fragment slot="actions">
		<button on:click={closeModal}>Abbrechen</button>
		<button on:click={saveWidgetData}>Speichern</button>
	</svelte:fragment>
</BaseModal>

<style>
	.config-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.config-form label {
		font-weight: bold;
	}
</style>
