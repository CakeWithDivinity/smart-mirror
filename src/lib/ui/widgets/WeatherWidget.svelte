<script lang="ts">
	import type { WeatherWidget } from '$lib/data/widgets';
	import { onMount, onDestroy } from 'svelte';

	export let widget: WeatherWidget;

	let weatherData: any = null;
	let error: any = null;
	let intervalId: number;

	//export let apiKey = 'ecc75202bc194e1da32140449241205'; // Set API key
	//export let location = '41812'; // Set location // someow confirm wich Lövenich? Eingabe auf längen und Breitengerade umstellen

	async function getWeatherData(apiKey: string, location: string): Promise<any> {
		const response = await fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no`,
		);

		return response.json();
	}

	onMount(async () => {
		try {
			// Fetch data immediately on mount
			weatherData = await getWeatherData(widget.apiKey, widget.location);

			// Then set up an interval to fetch data every second
			intervalId = setInterval(async () => {
				weatherData = await getWeatherData(widget.apiKey, widget.location);
			}, 1000); // 1 second * 1000 milliseconds
		} catch (e) {
			error = e;
		}
	});

	onDestroy(() => {
		// Clear the interval when the component is destroyed
		clearInterval(intervalId);
	});

	function getWeekday(day: number) {
		day = day % 7;
		switch (day) {
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

	function getWeekdayAbbreviation(day: number) {
		day = day % 7;
		switch (day) {
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

{#if error}
	<p>Error: {error.message}</p>
{:else if weatherData}
	<div class="weather-inner">
		<div class="weather-inner">
			{#if weatherData.error}
				Error occurred while fetching weather data for
				<p>
					location: {widget.location}
				</p>
				<p>
					apiKey: {widget.apiKey}
				</p>
				{weatherData.error.message}
			{/if}
		</div>
		<div class="weather-inner">
			{#if weatherData.location}
				<p>{weatherData.location.name}</p>
				<p>{getWeekday(new Date(weatherData.location.localtime).getDay())}</p>
				<!-- <p>{new Date(weatherData.location.localtime).toString()}</p> -->
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
			{:else}
				<p>No forecast data available.</p>
			{/if}
		</div>
	</div>

	<div class="weather-multiple">
		<div class="weather-inner">
			{#if weatherData.forecast}
				{#if weatherData.forecast.forecastday[1]}
					<p>
						{getWeekdayAbbreviation(new Date(weatherData.location.localtime).getDay() + 1)}
					</p>
					<p>
						<img src={weatherData.forecast.forecastday[1].day.condition.icon} alt="Weather Icon" />
					</p>
					<p>
						{weatherData.forecast.forecastday[1].day.mintemp_c}°C - {weatherData.forecast
							.forecastday[1].day.maxtemp_c}°C
					</p>
				{:else}
					<p>No data found for tomorrow.</p>
				{/if}
			{:else}
				<p>No forecast data available.</p>
			{/if}
		</div>

		<div class="weather-inner">
			{#if weatherData.forecast}
				{#if weatherData.forecast.forecastday[2]}
					<p>
						{getWeekdayAbbreviation(new Date(weatherData.location.localtime).getDay() + 2)}
					</p>
					<p>
						<img src={weatherData.forecast.forecastday[2].day.condition.icon} alt="Weather Icon" />
					</p>
					<p>
						{weatherData.forecast.forecastday[2].day.mintemp_c}°C - {weatherData.forecast
							.forecastday[2].day.maxtemp_c}°C
					</p>
				{:else}
					<p>No data found for over tomorrow.</p>
				{/if}
			{:else}
				<p>No forecast data available.</p>
			{/if}
		</div>

		<div class="weather-inner">
			{#if weatherData.forecast}
				{#if weatherData.forecast.forecastday[3]}
					<p>
						{getWeekdayAbbreviation(new Date(weatherData.location.localtime).getDay() + 3)}
					</p>
					<p>
						<img src={weatherData.forecast.forecastday[3].day.condition.icon} alt="Weather Icon" />
					</p>
					<p>
						{weatherData.forecast.forecastday[3].day.mintemp_c}°C - {weatherData.forecast
							.forecastday[3].day.maxtemp_c}°C
					</p>
				{:else}
					<p>No data found for over-over tomorrow.</p>
				{/if}
			{:else}
				<p>No forecast data available.</p>
			{/if}
		</div>
	</div>

	<!--
		error will never occure, lol
		-->
{:else}
	<p>No weather data available.</p>
{/if}

<style lang="scss">
	.weather-multiple {
		display: flex;
		justify-content: space-between;
	}
	.weather-inner {
		display: flex;
		justify-content: center;
		flex-direction: column; /* Add this line to make the paragraphs appear above each other */
		align-items: center; /* Add this line to center the content vertically */
	}
</style>
