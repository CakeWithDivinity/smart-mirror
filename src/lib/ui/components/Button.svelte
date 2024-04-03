<script lang="ts">
	export let style: 'primary' | 'secondary' | 'destructive' = 'primary';
	export let disabled: boolean = false;
</script>

<button class={style} {disabled} on:click><slot /></button>

<style lang="scss">
	button {
		padding-block: 0.5rem;
		padding-inline: 1rem;

		&.primary {
			background-color: var(--primary);
			color: var(--black);
			border-radius: 0.5rem;
			font-weight: bold;
			box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.05);
		}

		&.secondary {
			background-color: transparent;
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
