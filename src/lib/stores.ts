import type { SanityDocument } from '@sanity/client';
import type { NavList, IMessage } from './ts-interfaces';
import { writable, type Writable } from 'svelte/store';

/**
 * WRITABLE EXPORTS
 */
export let appMessages: Writable<IMessage[]> = writable([]);
export let locale = writable('en');
export let logoImage: Writable<SanityDocument> = writable();
export let nav: Writable<NavList> = writable();

/**
 * SANITY FETCH FUNCTIONS
 */
// const getBlogPosts = async (): Promise<[Posts]> => {
//     const blogQuery = `*[_type == 'post']`;
//     return await sanity.fetch(blogQuery);
// };

// const getPageContent = async (page: string): Promise<SanityDocument | null> => {
//     const query = `*[_type == '${page}'][0]`;
//     const res = await sanity.fetch(query);
//     if (res) return res;
//     else return null;
// };

/**
 * READABLE EXPORTS
 */
// export const blogPosts = readable(null, set => {
//     getBlogPosts().then(set).catch(err => console.error(err));
// });
