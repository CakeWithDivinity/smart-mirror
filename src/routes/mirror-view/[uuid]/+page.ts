import { displayStore } from '$lib/stores/display-store';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { goto } from '$app/navigation';
import type { Readable } from 'svelte/motion';
import type { Display } from '$lib/types/display';

export const load: PageLoad = ({ params }) => {
	const display = displayStore.getByUuid(params.uuid);

	if (get(display) === undefined) {
		goto('/');
	}

	return {
		display: display as Readable<Display>,
	};
};
