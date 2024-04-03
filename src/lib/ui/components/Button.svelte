<script lang="ts">
	export let style: 'primary' | 'secondary' | 'destructive' = 'primary';
	export let disabled: boolean = false;
</script>

<button class={style} {disabled} on:click><slot /></button>

<style lang="scss">
	button {
		padding-block: 0.5rem;
		padding-inline: 1rem;
		border-radius: 0.5rem;
		box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.05);

		&.primary {
			background-color: var(--primary);
			color: var(--black);
			font-weight: bold;
		}

		&.secondary {
			background-color: transparent;
		}

		&.destructive {
			background-color: var(--red);
			color: var(--white);
			font-weight: bold;
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
