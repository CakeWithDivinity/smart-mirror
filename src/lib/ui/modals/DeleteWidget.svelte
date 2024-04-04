<script lang="ts">
	import BaseModal from './BaseModal.svelte';
	import Button from '../components/Button.svelte';

	import { closeModal } from 'svelte-modals';
	import { displayStore } from '$lib/stores/display-store';
	import { WIDGET_ATTRIBUTES, type WidgetType } from '$lib/data/widgets';

	export let isOpen: boolean;
	export let displayUuid: string;
	export let widgetPosition: number;
	export let widgetType: WidgetType;

	function deleteWidget() {
		displayStore.deleteWidget(displayUuid, widgetPosition);
		closeModal();
	}
</script>

<BaseModal {isOpen}>
	<div class="content" slot="content">
		<p>
			Sind Sie sich sicher, dass das Widget "{WIDGET_ATTRIBUTES[widgetType].name}" gelöscht werden
			soll?
		</p>
		<p>Alle konfigurierten Daten gehen verloren!</p>
		<p class="warning">Diese Aktion ist nicht widerrufbar!</p>
	</div>

	<svelte:fragment slot="actions">
		<Button style="secondary" on:click={closeModal}>Abbrechen</Button>
		<Button style="destructive" on:click={deleteWidget}>Löschen</Button>
	</svelte:fragment>
</BaseModal>

<style lang="scss">
	.content {
		text-align: center;
	}

	.warning {
		color: var(--red);
		font-weight: bold;
	}
</style>
