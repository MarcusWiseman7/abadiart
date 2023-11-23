import sanity from '$lib/sanity';
import { parseContentToText } from '$lib/helpers';
import type { IProject } from '$lib/ts-interfaces';
import type { PageServerLoad } from './$types';

interface IData {
    project: IProject;
}

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    const query = `*[_type == "projects"][0] {
        "project": projects[] {
            "_key": "${id}",
            ...
        }[0]
    }`;
    const res: IData = await sanity.fetch(query);
    const description = res.project?.summary ? parseContentToText(res.project.summary) : '';
    
    return { data: JSON.stringify({ id, project: res.project, description }) };
}
