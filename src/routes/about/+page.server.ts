import { getDesktopIContent } from '$lib/helpers';
import sanity from '$lib/sanity';
import type { PageServerLoad } from '../$types';
import type { IContent } from '$lib/ts-interfaces';
import type { IPageData } from '$lib/types/pageData';

interface IData extends IPageData {
    aboutUs: IContent;
}

export const load: PageServerLoad = async (_) => {
    const query = `*[_type == 'about'][0]`;
    const res: IData = await sanity.fetch(query);

    if (res.aboutUs) {
        res.desktopAboutUs = getDesktopIContent(res.aboutUs);
    }

    return { data: JSON.stringify(res) };
};
