import type { IPageData } from '$lib/types/pageData';
import type { IContent, IMainImage } from '$lib/ts-interfaces';
interface IData extends IPageData {
    images: {
        images: IMainImage[];
    };
    missionStatement: IContent;
}
interface Reponse extends IPageData {
    images: IMainImage[];
    missionStatement: IContent;
    desktopMissionStatement: IContent;
}

import sanity from '$lib/sanity';
import { getDesktopIContent } from '$lib/helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (_) => {
    const query = `*[_type == 'home'][0]`;
    const res: IData = await sanity.fetch(query);

    const { missionStatement, images, description } = res;
    const response: Partial<Reponse> = { missionStatement, description };
    if (missionStatement) {
        response.desktopMissionStatement = getDesktopIContent(missionStatement);
    }
    if (images) response.images = images.images;

    return { data: JSON.stringify(response) };
}
