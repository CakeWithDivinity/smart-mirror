<script lang="ts">
	import BaseModal from './BaseModal.svelte';
	import Button from '../components/Button.svelte';

	import { closeModal } from 'svelte-modals';
	import { displayStore } from '$lib/stores/display-store';
	import { goto } from '$app/navigation';

	export let isOpen: boolean;

	let displayName = '';

	function createDisplay() {
		const newDisplay = displayStore.addDisplay(displayName);
		closeModal();
		goto(`/edit/${newDisplay.uuid}`);
	}
</script>

<BaseModal {isOpen}>
	<h2 slot="title">Darstellung erstellen</h2>
	<div class="content" slot="content">
		<input placeholder="Meine Darstellung" bind:value={displayName} />
	</div>

	<svelte:fragment slot="actions">
		<Button style="secondary" on:click={closeModal}>Abbrechen</Button>
		<Button disabled={!displayName.length} on:click={createDisplay}>Erstellen</Button>
	</svelte:fragment>
</BaseModal>

<style lang="scss">
	.content {
		display: flex;
		justify-content: center;
	}
</style>
