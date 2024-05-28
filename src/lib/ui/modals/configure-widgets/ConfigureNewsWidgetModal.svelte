<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import { apiKey, category, country } from './stores';
	import ConfigureNewsWidget from './ConfigureNewsWidget.svelte';
	import NewsWidget from './NewsWidget.svelte';

	// Stores for the configuration values
	export let apiKey = writable('');
	export let category = writable('general');
	export let country = writable('us');

	// Available options for categories and countries
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

	// Function to save the current configuration to localStorage
	const handleSave = () => {
		apiKey.update((value) => {
			localStorage.setItem('newsApiKey', value);
			return value;
		});
		category.update((value) => {
			localStorage.setItem('newsCategory', value);
			return value;
		});
		country.update((value) => {
			localStorage.setItem('newsCountry', value);
			return value;
		});
	};

	// Function to load the configuration from localStorage
	const loadSettings = () => {
		const storedApiKey = localStorage.getItem('newsApiKey') || '';
		const storedCategory = localStorage.getItem('newsCategory') || 'general';
		const storedCountry = localStorage.getItem('newsCountry') || 'us';
		apiKey.set(storedApiKey);
		category.set(storedCategory);
		country.set(storedCountry);
	};

	// Load settings when the component is mounted
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
