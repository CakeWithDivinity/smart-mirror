<script lang="ts">
	import type { WeatherWidget } from '$lib/data/widgets';
	import { error } from '@sveltejs/kit';

	export let widget: WeatherWidget;
	async function getCurrent(apiKey: string, location: string): Promise<any> {
		return await fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`,
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

	export let apiKey = 'ecc75202bc194e1da32140449241205'; // Set your API key here
	export let location = 'Lövenich'; // Set your location here

	// Call the getCurrent function with the apiKey
	export let response = getCurrent(apiKey, location);
	console.log(response);

	function getWeekday(is_day: Number) {
		switch (is_day) {
			case 0:
				return 'Sonntag';
			case 1:
				return 'Montag';
			case 2:
				return 'Dienstag';
			case 3:
				return 'Mittwoch';
			case 4:
				return 'Donnerstag';
			case 5:
				return 'Freitag';
			case 6:
				return 'Samstag';
			default:
				return 'Kein gültiger Tag';
		}
	}

	function getWeekdayAbbreviation(is_day: Number) {
		switch (is_day) {
			case 0:
				return 'So';
			case 1:
				return 'Mo';
			case 2:
				return 'Di';
			case 3:
				return 'Mi';
			case 4:
				return 'Do';
			case 5:
				return 'Fr';
			case 6:
				return 'Sa';
			default:
				return 'Not a valid day';
		}
	}
</script>

{#if response}
	{#await response}
		<p>Loading...</p>
	{:then weatherData}
		{#if weatherData.current}
			<p>{getWeekday(weatherData.current.is_day)}</p>
			<!--
					maybe add later on, problem: text is english
					<p>{weatherData.current.condition.text}</p>
				-->
		{:else}
			<p>Weekday could not be loaded</p>
		{/if}

		{#if weatherData.location}
			<p>{new Date(weatherData.location.localtime).toLocaleDateString('de-DE')}</p>
		{:else}
			<p>No Location found</p>
		{/if}

		{#if weatherData.current}
			<img src={weatherData.current.condition.icon} alt="Weather Icon" />
		{:else}
			<p>Image for today could not be loaded</p>
		{/if}

		{#if weatherData.forecast}
			{#if weatherData.forecast.forecastday[1]}
				<p>
					{weatherData.forecast.forecastday[0].day.mintemp_c}°C - {weatherData.forecast
						.forecastday[0].day.maxtemp_c}°C
				</p>
			{:else}
				<p>No data found for today.</p>
			{/if}

			<!-- not MVP
			{#if weatherData.current.temp_c}
				<p>{weatherData.current.temp_c}°C</p>
			{:else}
				<p>No temperature data found.</p>
			{/if}
			-->

			{#if weatherData.forecast.forecastday[1]}
				<p>
					{getWeekdayAbbreviation(weatherData.current.is_day + 1)}
					<img src={weatherData.forecast.forecastday[1].day.condition.icon} alt="Weather Icon" />
					{weatherData.forecast.forecastday[1].day.mintemp_c}°C - {weatherData.forecast
						.forecastday[1].day.maxtemp_c}°C
				</p>
			{:else}
				<p>No data found for tomorrow.</p>
			{/if}

			{#if weatherData.forecast.forecastday[2]}
				<p>
					{getWeekdayAbbreviation(weatherData.current.is_day + 2)}
					<img src={weatherData.forecast.forecastday[2].day.condition.icon} alt="Weather Icon" />
					{weatherData.forecast.forecastday[2].day.mintemp_c}°C - {weatherData.forecast
						.forecastday[2].day.maxtemp_c}°C
				</p>
			{:else}
				<p>No data found for over tomorrow.</p>
			{/if}

			{#if weatherData.forecast.forecastday[3]}
				<p>
					{getWeekdayAbbreviation(weatherData.current.is_day + 3)}
					<img src={weatherData.forecast.forecastday[3].day.condition.icon} alt="Weather Icon" />
					{weatherData.forecast.forecastday[3].day.mintemp_c}°C - {weatherData.forecast
						.forecastday[3].day.maxtemp_c}°C
				</p>
			{:else}
				<p>No data found for over-over tomorrow.</p>
			{/if}
		{:else}
			<p>No forecast data found.</p>
		{/if}

		{#if weatherData.error}
			<p>{weatherData.error.message}</p>
		{/if}
		<!--
		error will never occure, lol
		-->
	{:catch error}
		<p>Error: {error.message}</p>
	{/await}
{/if}
