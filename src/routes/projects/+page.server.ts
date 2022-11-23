import type { IPageData, IProject } from '$lib/ts-interfaces';
interface IData extends IPageData {
    projects: IProject[];
}

import sanity from '$lib/sanity';
// import { getDesktopIContent } from '$lib/helpers';


/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const query = `*[_type == 'projects'][0]`;
    const res: IData = await sanity.fetch(query);
    // if (res?.projects) {
    //     const desktopProjects: IProject[] = [];
    //     res.projects.forEach(project => {
    //         const newDescription = getDesktopIContent(project.description);
    //         const projectCopy = { ...project };
    //         projectCopy.description = newDescription;
    //         desktopProjects.push(projectCopy);
    //     });

    //     return { ...res, desktopProjects };
    // }
    
    return res;
}
