import type { IProject } from '$lib/ts-interfaces';
interface IData {
    project: IProject;
}

import sanity from '$lib/sanity';
import { parseContentToText } from '$lib/helpers';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { id } = params;

    const query = `*[_type == "projects"][0] {
        "project": projects[] {
            "_key": "${id}",
            ...
        }[0]
    }`;
    const res: IData = await sanity.fetch(query);
    const description = res.project?.summary ? parseContentToText(res.project.summary) : '';
    
    return { id, project: res.project, description };
}
