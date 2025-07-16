import sanity from '$lib/sanity';
import { parseContentToText } from '$lib/helpers';
import type { IProject } from '$lib/ts-interfaces';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    const query = `*[_type == "projects"][0].projects[_key == "${id}"][0]`;
    const res: IProject = await sanity.fetch(query);

    const description = res?.summary ? parseContentToText(res.summary) : '';

    return { data: JSON.stringify({ id, project: res, description }) };
};
