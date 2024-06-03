import type { ComponentType } from 'svelte';
import CalendarWidgetComponent from '$lib/ui/widgets/CalendarWidget.svelte';
import NewsWidgetComponent from '$lib/ui/widgets/NewsWidget.svelte';
import WeatherWidgetComponent from '$lib/ui/widgets/WeatherWidget.svelte';
import ConfigureWeatherWidgetModal from '$lib/ui/modals/configure-widgets/ConfigureWeatherWidgetModal.svelte';
import ConfigureNewsWidgetModal from '$lib/ui/modals/configure-widgets/ConfigureNewsWidgetModal.svelte';
import ConfigureCalendarWidgetModal from '$lib/ui/modals/configure-widgets/ConfigureCalendarWidgetModal.svelte';

export const WIDGET_TYPES = ['calendar', 'news', 'weather'] as const;

export type WidgetType = (typeof WIDGET_TYPES)[number];

export const WIDGET_ATTRIBUTES = {
	calendar: {
		icon: 'mdi:calendar-outline',
		name: 'Kalender',
		widgetComponent: CalendarWidgetComponent,
		configureModal: ConfigureCalendarWidgetModal,
	},
	news: {
		icon: 'mdi:bell',
		name: 'Nachrichten',
		widgetComponent: NewsWidgetComponent,
		configureModal: ConfigureNewsWidgetModal,
	},
	weather: {
		icon: 'fluent:weather-haze-20-filled',
		name: 'Wetter',
		widgetComponent: WeatherWidgetComponent,
		configureModal: ConfigureWeatherWidgetModal,
	},
} as const satisfies Record<WidgetType, WidgetData>;

export interface WidgetData {
	icon: string;
	name: string;
	widgetComponent: ComponentType;
	configureModal: ComponentType;
}

export interface BaseWidget {
	type: WidgetType;
}

export interface CalendarWidget extends BaseWidget {
	type: 'calendar';
}

export interface NewsWidget extends BaseWidget {
	type: 'news';
	apiKey:string;
	country:string;
	category:string;
}

export interface WeatherWidget extends BaseWidget {
	type: 'weather';
}

export type Widget = CalendarWidget | NewsWidget | WeatherWidget;

export function createWidget<T extends WidgetType>(widgetType: T): Widget {
	switch (widgetType) {
		case 'calendar':
			return { type: 'calendar' };
		case 'news':
			return { type: 'news', apiKey:'',
			country:'',
			category:'' };
		case 'weather':
			return { type: 'weather' };
	}

	throw new Error(`Unhandled widgetType ${widgetType}`);
}
