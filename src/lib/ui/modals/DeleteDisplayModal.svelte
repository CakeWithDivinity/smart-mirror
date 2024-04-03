<script lang="ts">
	import BaseModal from './BaseModal.svelte';
	import Button from '../components/Button.svelte';

	import { closeModal } from 'svelte-modals';
	import { displayStore } from '$lib/stores/display-store';

	export let isOpen: boolean;
	export let displayUuid: string;

	const display = displayStore.getByUuid(displayUuid);

	function deleteDisplay() {
		displayStore.deleteDisplay(displayUuid);
		closeModal();
	}
</script>

<BaseModal {isOpen}>
	<div class="content" slot="content">
		{#if $display}
			<p>Sind Sie sich sicher, dass die Darstellung {$display.name} gelöscht werden soll?</p>
			<p class="warning">Diese Aktion ist nicht widerrufbar!</p>
		{:else}
			<p class="warning">Darstellung nicht gefunden!</p>
		{/if}
	</div>

	<svelte:fragment slot="actions">
		<Button style="secondary" on:click={closeModal}>Abbrechen</Button>
		{#if $display}
			<Button style="destructive" on:click={deleteDisplay}>Löschen</Button>
		{/if}
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
