<script lang="ts">
	import '../globals.scss';
	import { Modals, closeModal } from 'svelte-modals';
</script>

<slot />

<Modals>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div slot="backdrop" class="backdrop" on:click={closeModal}></div>
</Modals>

<style lang="scss">
	.backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.8);
	}
</style>
