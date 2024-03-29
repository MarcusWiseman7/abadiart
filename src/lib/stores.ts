import type { INav, IMessage, IMainImage } from './ts-interfaces';
import { writable, type Writable } from 'svelte/store';

/**
 * WRITABLE EXPORTS
 */
export let appMessages: Writable<IMessage[]> = writable([]);
export let locale = writable('en');
export let logoImage: Writable<IMainImage> = writable();
export let nav: Writable<INav[]> = writable();
export let loading = writable(false);
export let device = writable('');
