<script>
	import { writable } from 'svelte/store';

	export let apiKey = writable('');
	export let category = writable('general');
	export let country = writable('us');

	const categories = [
		'business',
		'entertainment',
		'general',
		'health',
		'science',
		'sports',
		'technology',
	];
	const countries = ['us', 'de', 'fr', 'gb', 'it', 'jp', 'ru', 'cn'];

	const handleSave = () => {
		localStorage.setItem('newsApiKey', $apiKey);
		localStorage.setItem('newsCategory', $category);
		localStorage.setItem('newsCountry', $country);
	};

	const loadSettings = () => {
		apiKey.set(localStorage.getItem('newsApiKey') || 'c5edad3af6e04e8cb3e78cca4c73c169');
		category.set(localStorage.getItem('newsCategory') || 'general');
		country.set(localStorage.getItem('newsCountry') || 'us');
	};

	onMount(() => {
		loadSettings();
	});
</script>

<div class="config-form">
	<label>
		API Key:
		<input type="text" bind:value={$apiKey} />
	</label>
	<label>
		Category:
		<select bind:value={$category}>
			{#each categories as cat}
				<option value={cat}>{cat}</option>
			{/each}
		</select>
	</label>
	<label>
		Country:
		<select bind:value={$country}>
			{#each countries as cnt}
				<option value={cnt}>{cnt}</option>
			{/each}
		</select>
	</label>
	<button on:click={handleSave}>Save</button>
</div>

<style>
	.config-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.config-form label {
		font-weight: bold;
	}
</style>
