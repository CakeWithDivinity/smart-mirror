<script lang="ts">
	import type { WeatherWidget } from '$lib/data/widgets';
	import { onMount, onDestroy } from 'svelte';

	export let widget: WeatherWidget;

	let weatherData: any = null;
	let error: any = null;
	let intervalId: number;

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

			// Set up an interval to fetch data every second
			intervalId = setInterval(async () => {
				weatherData = await getWeatherData(widget.apiKey, widget.location);
			}, 60000); // 60 second * 1000 milliseconds
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
				return 'Kein gültiger Tag';
		}
	}
</script>

{#if error}
	<p>Error: {error.message}</p>
{:else if weatherData}
	<div class="weather-inner">
		<div class="weather-inner">
			{#if weatherData.error}
				Ein Fehler ist beim Anfragen der Wetterdaten aufgetreten:
				<p>
					Ort: {widget.location}
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
				<p>{new Date(weatherData.location.localtime).toLocaleDateString('de-DE')}</p>
			{:else}
				<p class="error">Ort nicht gefunden</p>
			{/if}

			{#if weatherData.current}
				<img src={weatherData.current.condition.icon} alt="Weather Icon" />
			{:else}
				<p class="error">Bild konnte nicht geladen werden</p>
			{/if}

			{#if weatherData.forecast?.forecastday?.[0]}
				<p>
					{weatherData.forecast.forecastday[0].day.mintemp_c}°C - {weatherData.forecast
						.forecastday[0].day.maxtemp_c}°C
				</p>
			{:else}
				<p class="error">Keine Daten für heute verfügbar.</p>
			{/if}
		</div>
	</div>

	<div class="weather-multiple">
		{#each weatherData.forecast?.forecastday?.slice(1, 3) ?? [] as currentDay}
			<div class="weather-inner">
				{#if currentDay}
					<p>
						{getWeekdayAbbreviation(new Date(currentDay.date).getDay())}
					</p>
					<p>
						<img src={currentDay.day.condition.icon} alt="Weather Icon" />
					</p>
					<p>
						{currentDay.day.mintemp_c}°C - {currentDay.day.maxtemp_c}°C
					</p>
				{:else}
					<p>Keine Daten für diesen Tag verfügbar.</p>
				{/if}
			</div>
		{:else}
			<p class="error">Keine Wetterdaten verfügbar</p>
		{/each}
	</div>
{:else}
	<p class="error">Keine Wetterdaten verfügbar</p>
{/if}

<style lang="scss">
	.weather-multiple {
		display: flex;
		justify-content: space-between;
		padding-top: 2rem;
	}
	.weather-inner {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.error {
		text-align: center;
	}
</style>
