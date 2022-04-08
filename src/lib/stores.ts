import { readable } from 'svelte/store';
import sanity from './sanity';

/**
 * INTERFACES
 */
interface Posts {
    title: String;
    slug: String;
    author: {
        name: String;
        image: {};
    };
    mainImage: {};
    categories: [
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

/**
 * WRITABLE EXPORTS
 */

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

/**
 * READABLE EXPORTS
 */
export const blogPosts = readable(null, set => {
    getBlogPosts().then(set).catch(err => console.error(err));
});

export const logoImage = readable(null, set => {
    getLogo().then(set).catch(err => console.error(err));
});

/**
 * DERIVED EXPORTS
 */