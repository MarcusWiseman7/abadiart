import { readable } from 'svelte/store';
import sanity from './sanity';

/**
 * INTERFACES
 */

/**
 * WRITABLE EXPORTS
 */

/**
 * SANITY FETCH FUNCTIONS
 */
const getBlogPosts = async () => {
    const blogQuery = `*[_type == 'post']`;
    return await sanity.fetch(blogQuery);
};

/**
 * READABLE EXPORTS
 */
export const blogPosts = readable(null, set => {
    getBlogPosts().then(set).catch(err => console.error(err));
});

/**
 * DERIVED EXPORTS
 */