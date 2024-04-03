import type { Display } from '$lib/types/display';
import { generateUUID } from '$lib/utils/generate-uuid';
import { persisted } from 'svelte-persisted-store';

export const displayStore = (() => {
	const store = persisted<Display[]>('displays', []);

	function addDisplay(name: string): Display {
		const newDisplay = { uuid: generateUUID(), name };

		store.update((displays) => {
			return [...displays, newDisplay];
		});

		return newDisplay;
	}

	return {
		subscribe: store.subscribe,
		addDisplay,
	};
})();
