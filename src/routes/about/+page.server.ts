import type { IContent, IPageData } from '$lib/ts-interfaces';
interface IData extends IPageData {
    aboutUs: IContent;
}

import { getDesktopIContent } from '$lib/helpers';
import sanity from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
    const query = `*[_type == 'about'][0]`;
    const res: IData = await sanity.fetch(query);
    
    if (res?.aboutUs) {
        const desktopAboutUs = getDesktopIContent(res.aboutUs);

        return { ...res, desktopAboutUs };
    }

    return res;
}
