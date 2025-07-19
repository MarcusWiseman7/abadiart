import sanity from '$lib/sanity';
import type { IProject } from '$lib/ts-interfaces';
import type { IPageData } from '$lib/types/pageData';
import type { PageServerLoad } from './$types';

interface IData extends IPageData {
    projects: IProject[];
}

export const load: PageServerLoad = async (_) => {
    const query = `*[_type == 'projects'][0]`;
    const res: IData = await sanity.fetch(query);

    return { data: JSON.stringify(res) };
};
