export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8')
];

export const server_loads = [0];

export const dictionary = {
		"/": [~2],
		"/buy": [~3],
		"/flight/[date]x[flightID]": [~4],
		"/login": [~5],
		"/signup": [~6],
		"/swaps": [~7],
		"/view/[flightid]x[date]x[seatnumber]": [~8]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';