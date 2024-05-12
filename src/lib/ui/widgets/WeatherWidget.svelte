<script lang="ts">
	import type { WeatherWidget } from '$lib/data/widgets';
	import { error } from '@sveltejs/kit';

	export let widget: WeatherWidget;
	async function getWeather(): Promise<any> {
		return await fetch(
			'http://api.weatherapi.com/v1/current.json?key=ecc75202bc194e1da32140449241205&q=Lövenix&aqi=no',
		)
			.then((res) => {
				if (res.status !== 200) {
					console.log(res);
				}
					return res.json();	
			})
			.catch((error) => {
				// Handle any errors that occur during the API call
				console.error(error);
				return error;
			});
	}

	export let response = getWeather();
	console.log(response);
</script>

{widget.type} Testwirget :) if api call return json, show it here

{#if response}
	{#await response}
		<p>Loading...</p>
	{:then weatherData}
		{#if weatherData.current}
			<h2>{weatherData.current.temp_c}°C</h2>
		{/if}
		{#if weatherData.location}
			<h2>{weatherData.location.name}</h2>
		{/if}
		{#if weatherData.error}
			<p>{weatherData.error.message}</p>
		{/if}
	{:catch error}
		<p>Error: {error.message}</p>
	{/await}
{/if}

