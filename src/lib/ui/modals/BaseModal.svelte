<script lang="ts">
	export let isOpen: boolean;
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="title"><slot name="title" /></div>
		<div class="content"><slot name="content" /></div>
		<div class="actions"><slot name="actions" /></div>
	</div>
{/if}

<style lang="scss">
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		background-color: var(--white);
		padding-block: 1.5rem;
		padding-inline: 3rem;
		border-radius: 1rem;
	}

	.content {
		min-width: 30rem;
	}

	.actions {
		display: flex;
		justify-content: end;
		gap: 0.5rem;
		width: 100%;
	}
</style>
