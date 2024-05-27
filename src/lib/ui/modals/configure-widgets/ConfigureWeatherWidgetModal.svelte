<script lang="ts">
	import BaseModal from '../BaseModal.svelte';
	import Button from '../../components/Button.svelte';

	import { closeModal } from 'svelte-modals';
	import { displayStore } from '$lib/stores/display-store';
	import type { WeatherWidget } from '$lib/data/widgets';

	export let isOpen: boolean;
	export let widget: WeatherWidget;
	export let position: number;
	export let displayUuid: string;

	function saveWidgetData() {
		displayStore.updateWidget(displayUuid, position, widget);
		closeModal();
	}
</script>

<BaseModal {isOpen}>
	<h2 slot="title">Wetter-Widget konfigurieren</h2>
	<div class="content" slot="content">
		<p>
			<label for="location">Location: </label>
			<input type="text" style="width: 42ch;" id="latitude" bind:value={widget.location} />
		</p>
		<p>
			<label for="apiKey">API Key: </label>
			<input type="text" style="width: 42ch;" id="apiKey" bind:value={widget.apiKey} />
		</p>
	</div>

	<svelte:fragment slot="actions">
		<Button style="secondary" on:click={closeModal}>Abbrechen</Button>
		<Button on:click={saveWidgetData}>Speichern</Button>
	</svelte:fragment>
</BaseModal>

<style lang="scss">
	.content {
		justify-content: space-between;
	}
	.content p {
		margin: 1rem;
	}
</style>
