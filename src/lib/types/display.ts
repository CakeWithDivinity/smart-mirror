import type { Widget } from '$lib/data/widgets';

export interface Display {
	uuid: string;
	name: string;
	widgets: (Widget | undefined)[];
}
