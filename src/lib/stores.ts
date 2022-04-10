import { readable, writable } from 'svelte/store';
import sanity from './sanity';

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
    image: {};
};

interface PageContent {
    title?: string;
    description?: string;
    keywords?: [string];
    content?: [];
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
    const logoQuery = `*[_type == 'logo']`;
    const res = await sanity.fetch(logoQuery);
    if (res && res[0]) return res[0];
    else return null;
};

const getPageContent = async (title: string): Promise<PageContent> => {
    const pageQuery = `*[_type == 'pages' && slug.current == '${title}']`;
    const res = await sanity.fetch(pageQuery);
    if (res && res[0]) return res[0];
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

/**
 * DERIVED EXPORTS
 */