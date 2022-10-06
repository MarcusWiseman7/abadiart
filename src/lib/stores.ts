import type { SanityDocument } from '@sanity/client';
import { readable, writable } from 'svelte/store';
import sanity from './sanity';
import type { Logo, NavList, Posts } from './ts-interfaces';

/**
 * WRITABLE EXPORTS
 */
export let appMessages = writable([]);
export let locale = writable('en');

/**
 * SANITY FETCH FUNCTIONS
 */
const getBlogPosts = async (): Promise<[Posts]> => {
    const blogQuery = `*[_type == 'post']`;
    return await sanity.fetch(blogQuery);
};

const getLogo = async (): Promise<Logo | null> => {
    const logoQuery = `*[_type == 'logo'][0]`;
    const res = await sanity.fetch(logoQuery);
    if (res) return res;
    else return null;
};

const getNav = async (): Promise<NavList | null> => {
    const navQuery = `*[_type == 'nav'] {navList}[0]`;
    const res = await sanity.fetch(navQuery);
    if (res?.hasOwnProperty('navList')) return res.navList;
    else return null;
};

const getPageContent = async (page: string): Promise<SanityDocument | null> => {
    const query = `*[_type == '${page}'][0]`;
    const res = await sanity.fetch(query);
    if (res) return res;
    else return null;
};

/**
 * READABLE EXPORTS
 */
export const blogPosts = readable(null, set => {
    getBlogPosts().then(set).catch(err => console.error(err));
});

export const logoImage = readable(null, set => {
    getLogo().then(set).catch(err => console.error(err));
});

export const aboutContent = readable(null, set => {
    getPageContent('about').then(set).catch(err => console.error(err));
});

export const contactContent = readable(null, set => {
    getPageContent('contact').then(set).catch(err => console.error(err));
});

export const pressContent = readable(null, set => {
    getPageContent('press').then(set).catch(err => console.error(err));
});

export const workContent = readable(null, set => {
    getPageContent('work').then(set).catch(err => console.error(err));
});

export const nav = readable(null, set => {
    getNav().then(set).catch(err => console.error(err));
});
