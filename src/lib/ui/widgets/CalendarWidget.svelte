<script lang="ts">
	import type { CalendarWidget } from '$lib/data/widgets';
	import { json } from '@sveltejs/kit';

	export let widget: CalendarWidget;

	// Initial values for the current date and time
	let newDate = new Date();
	let currentdate = String;
	let currenttime = String;

	// Function to display the current date and time
	function displayDateTime() {
		newDate = new Date();
		currentdate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;
		currenttime = `${newDate.getHours()}:${newDate.getMinutes()} Uhr`;
	}

	displayDateTime();

	// Reload date and time every minute
	setInterval(() => {
		displayDateTime();
	}, 60000);

	// call the api with the year and loacation
	const year = newDate.getFullYear();
	//const nextYear = newDate.getFullYear() + 1;

	const getHolidays = async () => {
		const response = await fetch('https://date.nager.at/api/v3/publicholidays/' + year + '/DE');
		const holidaysForThisYear = await response.json();
		const holidays = [];

		for (let i = 0; i < holidaysForThisYear.length; i++) {
			if (
				compareDates(currentdate, formatDate(holidaysForThisYear[i].date)) < 0 &&
				incresment() <= 3
			) {
				holidays.push(holidaysForThisYear[i]);
			}
			if (holidays.length < 3) {
				const response2 = await fetch(
					'https://date.nager.at/api/v3/publicholidays/' + (year + 1) + '/DE',
				);
				const holidaysForNextYear = await response2.json();
				holidaysForThisYear.push(holidaysForNextYear[i]);
			}
		}
		return holidays;
	};

	// Reload API data every minute
	setInterval(async () => {
		const holidaysForThisYear = await getHolidays();
	}, 3600000);

	// change date format to dd.mm.yyyy
	function formatDate(inputDate) {
		const parts = inputDate.split('-'); // Split the input date into an array [year, month, day]
		const year = parts[0];
		const month = parts[1];
		const day = parts[2];
		const newFormat = `${day}.${month}.${year}`;
		return newFormat;
	}

	// Compare two dates
	function compareDates(date1, date2) {
		const d1Parts = date1.split('.');
		const d2Parts = date2.split('.');
		const d1 = new Date(d1Parts[2], d1Parts[1] - 1, d1Parts[0]);
		const d2 = new Date(d2Parts[2], d2Parts[1] - 1, d2Parts[0]);
		return d1 <= d2 ? -1 : d1 > d2 ? 1 : 0;
	}

	// how many holidays to show
	let index = 0;
	function incresment() {
		index += 1;
		return index;
	}
	function isToday(ToDay: Date) {
		if (formatDate(ToDay) == currentdate) {
			return true;
		} else {
			return false;
		}
	}
</script>

<h1>{currentdate + ' - ' + currenttime}</h1>

{#await getHolidays()}
	<p>Loading ...</p>
{:then holidaysForThisYear}
	<div class="holidays_container">
		{#each holidaysForThisYear as h}
			<div class="dateOfHoliday"><p class:is-Today={isToday(h.date)}>{formatDate(h.date)}</p></div>
			<div class="nameOfHoliday"><p class:is-Today={isToday(h.date)}>{h.localName}</p></div>
			<br />
		{/each}
	</div>
{/await}

<style>
	* {
		color: whitesmoke;
		text-align: center;
	}

	h1 {
		text-decoration: underline;
	}
	.holidays_container {
		margin-top: 5vh;
		display: flex;
		flex-wrap: wrap;
	}
	.dateOfHoliday,
	.nameOfHoliday {
		padding: 5%;
		width: 50%;
	}

	.is-Today {
		color: yellow;
	}
</style>
