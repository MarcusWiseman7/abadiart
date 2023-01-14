import type { IPageData, IProject } from '$lib/ts-interfaces';
interface IData extends IPageData {
    projects: IProject[];
}

import sanity from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const query = `*[_type == 'projects'][0]`;
    const res: IData = await sanity.fetch(query);
    
    return res;
}
