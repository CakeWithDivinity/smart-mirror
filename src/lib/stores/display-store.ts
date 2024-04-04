import { createWidget, type Widget, type WidgetType } from '$lib/data/widgets';
import type { Display } from '$lib/types/display';
import { generateUUID } from '$lib/utils/generate-uuid';
import { persisted } from 'svelte-persisted-store';
import { derived, type Readable } from 'svelte/store';

export const displayStore = (() => {
	const store = persisted<Display[]>('displays', []);

	function addDisplay(name: string): Display {
		const newDisplay = {
			uuid: generateUUID(),
			name,
			widgets: new Array<Widget | undefined>(12).fill(undefined),
		};

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

	function placeWidget(displayUuid: string, position: number, widgetType: WidgetType) {
		store.update((displays) => {
			const display = displays.find((display) => display.uuid === displayUuid);

			if (!display) {
				throw new Error(`Couldn't find display to update with uuid ${displayUuid}`);
			}

			display.widgets[position] = createWidget(widgetType);

			return displays;
		});
	}

	return {
		subscribe: store.subscribe,
		addDisplay,
		deleteDisplay,
		getByUuid,
		placeWidget,
	};
})();
