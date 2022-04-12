import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';
import { derived, readable, writable } from 'svelte/store';
import sanity from './sanity';

const locale = 'en';

/**
 * INTERFACES
 */
interface Posts {
    title: string;
    slug: string;
    author: {
        name: string;
        image: {};
    };
    mainImage?: {};
    categories?: [
        {
            category: {};
        }
    ];
    publishedAt: Date;
    body: [];
};

interface Logo {
    image: SanityImageAssetDocument;
};

interface NavList {
    navList: [
        {
            name: string;
            href: string;
        }
    ];
};

/**
 * WRITABLE EXPORTS
 */
export let appMessages = writable([]);

/**
 * SANITY FETCH FUNCTIONS
 */
const getBlogPosts = async (): Promise<[Posts]> => {
    const blogQuery = `*[_type == 'post']`;
    return await sanity.fetch(blogQuery);
};

const getLogo = async (): Promise<Logo> => {
    const logoQuery = `*[_type == 'logo'][0]`;
    const res = await sanity.fetch(logoQuery);
    if (res) return res;
    else return null;
};

const getNav = async (): Promise<NavList> => {
    const navQuery = `*[_type == 'nav'] {
        "navList": navList[] {
                href,
                "name": name.${locale},
            },
    }[0]`;
    const res = await sanity.fetch(navQuery);
    if (res?.hasOwnProperty('navList')) return res.navList;
    else return null;
};

const getAboutContent = async (): Promise<SanityDocument> => {
    const aboutQuery = `*[_type == 'about'] {
        "title": title.${locale},
        "bio": bio.${locale},
        images,
        description,
        keywords,
    }[0]`;
    const res = await sanity.fetch(aboutQuery);
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
    getAboutContent().then(set).catch(err => console.error(err));
});

export const nav = readable(null, set => {
    getNav().then(set).catch(err => console.error(err));
});

/**
 * DERIVED EXPORTS
 */
export const titleList = derived(aboutContent, ($aboutContent) => {
    const obj = {};

    if ($aboutContent?.title) obj['/about'] = $aboutContent.title;
    return obj;
});