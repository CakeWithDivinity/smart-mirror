import type { Display } from '$lib/types/display';
import { generateUUID } from '$lib/utils/generate-uuid';
import { persisted } from 'svelte-persisted-store';
import { derived, type Readable } from 'svelte/store';

export const displayStore = (() => {
	const store = persisted<Display[]>('displays', []);

	function addDisplay(name: string): Display {
		const newDisplay = { uuid: generateUUID(), name };

		store.update((displays) => {
			return [...displays, newDisplay];
		});

		return newDisplay;
	}

	function deleteDisplay(uuid: string) {
		store.update((displays) => displays.filter((display) => display.uuid !== uuid));
	}

	function getByUuid(uuid: string): Readable<Display | undefined> {
		return derived(store, (displays) => displays.find((display) => display.uuid === uuid));
	}

	return {
		subscribe: store.subscribe,
		addDisplay,
		deleteDisplay,
		getByUuid,
	};
})();
