<script lang="ts">
	import { onMount } from 'svelte';

	// Initial values for the current date and time
	let newDate = new Date();
	let currentDate: string;
	let currentTime: string;
	let holidays: any[];

	// Function to display the current date and time
	function displayDateTime() {
		newDate = new Date();
		currentDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;
		currentTime = `${newDate.getHours()}:${newDate.getMinutes()} Uhr`;
	}

	displayDateTime();

	// call the api with the year and loacation
	//const nextYear = newDate.getFullYear() + 1;

	const getHolidays = async () => {
		const year = newDate.getFullYear();
		const response = await fetch('https://date.nager.at/api/v3/publicholidays/' + year + '/DE');
		const holidaysForThisYear = await response.json();
		const nextHolidays = [];

		for (let i = 0; i < holidaysForThisYear.length; i++) {
			if (
				compareDates(currentDate, formatDate(holidaysForThisYear[i].date)) < 0 &&
				incresment() <= 3
			) {
				nextHolidays.push(holidaysForThisYear[i]);
			}
			if (nextHolidays.length < 3) {
				const response2 = await fetch(
					'https://date.nager.at/api/v3/publicholidays/' + (year + 1) + '/DE',
				);
				const holidaysForNextYear = await response2.json();
				holidaysForThisYear.push(holidaysForNextYear[i]);
			}
		}

		holidays = nextHolidays;
	};

	// Reload API data every minute

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
		if (formatDate(ToDay) == currentDate) {
			return true;
		} else {
			return false;
		}
	}

	onMount(() => {
		displayDateTime();
		getHolidays();

		const timeInterval = setInterval(() => {
			displayDateTime();
		}, 60000);

		const holidayInterval = setInterval(() => {
			getHolidays();
		}, 3600000);

		return () => {
			clearInterval(timeInterval);
			clearInterval(holidayInterval);
		};
	});
</script>

<h1>{currentDate + ' - ' + currentTime}</h1>

{#if !holidays}
	<p>Loading ...</p>
{:else}
	<div class="holidays_container">
		{#each holidays as h}
			<div class="dateOfHoliday"><p class:is-Today={isToday(h.date)}>{formatDate(h.date)}</p></div>
			<div class="nameOfHoliday"><p class:is-Today={isToday(h.date)}>{h.localName}</p></div>
			<br />
		{/each}
	</div>
{/if}

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
