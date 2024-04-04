<script lang="ts">
	import BaseModal from '../BaseModal.svelte';
	import Button from '../../components/Button.svelte';

	import { closeModal } from 'svelte-modals';
	import { displayStore } from '$lib/stores/display-store';
	import type { CalendarWidget } from '$lib/data/widgets';

	export let isOpen: boolean;
	export let widget: CalendarWidget;
	export let position: number;
	export let displayUuid: string;

	function saveWidgetData() {
		displayStore.updateWidget(displayUuid, position, widget);
		closeModal();
	}
</script>

<BaseModal {isOpen}>
	<h2 slot="title">Kalender-Widget konfigurieren</h2>
	<div class="content" slot="content">...</div>

	<svelte:fragment slot="actions">
		<Button style="secondary" on:click={closeModal}>Abbrechen</Button>
		<Button on:click={saveWidgetData}>Speichern</Button>
	</svelte:fragment>
</BaseModal>

<style lang="scss">
	.content {
		display: flex;
		justify-content: center;
	}
</style>
