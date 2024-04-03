<script lang="ts">
	import { displayStore } from '$lib/stores/display-store';
	import CreateDisplayModal from '$lib/ui/modals/CreateDisplayModal.svelte';
	import DeleteDisplayModal from '$lib/ui/modals/DeleteDisplayModal.svelte';
	import Icon from '@iconify/svelte';
	import { openModal } from 'svelte-modals';

	function createDisplay() {
		openModal(CreateDisplayModal);
	}

	function deleteDisplay(uuid: string) {
		openModal(DeleteDisplayModal, { displayUuid: uuid });
	}
</script>

<h1>Darstellungen</h1>
<div class="display-list">
	{#each $displayStore as display}
		<a href="/edit/{display.uuid}" class="card display-card">
			<div class="preview"></div>
			<p>{display.name}</p>
			<button
				class="delete"
				on:click|stopPropagation|preventDefault={() => deleteDisplay(display.uuid)}
			>
				<Icon height="26" icon="material-symbols:delete-outline" />
			</button>
		</a>
	{/each}

	<button class="card add-card" on:click={createDisplay}>
		<Icon icon="material-symbols:add" height="46" />
	</button>
</div>

<style lang="scss">
	h1 {
		margin-bottom: 2rem;
	}

	.display-list {
		display: grid;
		max-width: 100%;
		grid-template-columns: repeat(5, 1fr);
		gap: 5rem;
	}

	.card {
		height: 24rem;
		width: 18rem;
		background-color: var(--primary);
		border-radius: 1rem;
	}

	.display-card {
		display: flex;
		flex-direction: column;
		padding: 0.25rem;
		position: relative;

		.preview {
			flex-grow: 1;
			background-color: var(--gray);
			border-radius: 0.75rem;
		}

		p {
			text-align: center;
			padding-block: 0.25rem;
		}

		.delete {
			position: absolute;
			top: 0;
			right: 0;
			background-color: transparent;
			color: var(--red);
			padding: 0.75rem;
		}
	}

	.add-card {
		background-color: var(--gray);
	}
</style>
