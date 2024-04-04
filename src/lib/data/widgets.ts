export const WIDGET_TYPES = ['calendar', 'news', 'weather'] as const;

export type WidgetType = (typeof WIDGET_TYPES)[number];

export const WIDGET_ATTRIBUTES = {
	calendar: {
		type: 'calendar',
		icon: 'mdi:calendar-outline',
		name: 'Kalender',
	},
	news: {
		type: 'news',
		icon: 'mdi:bell',
		name: 'Nachrichten',
	},
	weather: {
		type: 'weather',
		icon: 'fluent:weather-haze-20-filled',
		name: 'Wetter',
	},
} as const satisfies Record<WidgetType, BaseWidget>;

export interface BaseWidget {
	type: WidgetType;
	icon: string;
	name: string;
}

export interface CalendarWidget extends BaseWidget {
	type: 'calendar';
}

export interface NewsWidget extends BaseWidget {
	type: 'calendar';
}

export interface WeatherWidget extends BaseWidget {
	type: 'calendar';
}

export type Widget = CalendarWidget | NewsWidget | WeatherWidget;
