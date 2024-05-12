<script lang="ts">
	import type { WeatherWidget } from '$lib/data/widgets';

	export let widget: WeatherWidget;
	const response ={
    "location": {
        "name": "Lövenich",
        "region": "Nordrhein-Westfalen",
        "country": "Deutschland",
        "lat": 50.68,
        "lon": 6.67,
        "tz_id": "Europe/Berlin",
        "localtime_epoch": 1715523788,
        "localtime": "2024-05-12 16:23"
    },
    "current": {
        "last_updated_epoch": 1715523300,
        "last_updated": "2024-05-12 16:15",
        "temp_c": 25.0,
        "temp_f": 77.0,
        "is_day": 1,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
            "code": 1003
        },
        "wind_mph": 11.9,
        "wind_kph": 19.1,
        "wind_degree": 90,
        "wind_dir": "E",
        "pressure_mb": 1014.0,
        "pressure_in": 29.94,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 34,
        "cloud": 75,
        "feelslike_c": 26.0,
        "feelslike_f": 78.7,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "uv": 6.0,
        "gust_mph": 14.7,
        "gust_kph": 23.6
    }
}
</script>

{widget.type} Testwirget :)

if api call return json, show it here

{#if response}
	{#if response.location}
		<h1>{response.location.name}</h1>
	{/if}
	{#if response.current}
		<h2>{response.current.temp_c}°C</h2>
	{/if}
{/if}

