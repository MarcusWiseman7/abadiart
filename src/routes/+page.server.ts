import type { IContent, IMainImage, IPageData } from '$lib/ts-interfaces';
interface IData extends IPageData {
    images: {
        images: IMainImage[];
    };
    missionStatement: IContent;
}

import sanity from '$lib/sanity';
import { getDesktopIContent } from '$lib/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const query = `*[_type == 'home'][0]`;
    const res: IData = await sanity.fetch(query);

    if (res?.missionStatement) {
        const desktopMissionStatement = getDesktopIContent(res.missionStatement);
        
        return { ...res, desktopMissionStatement };
    }

    return res;
}
