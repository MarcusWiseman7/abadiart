import sanity from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (_) => {
    const query = `*[_type == 'work'][0]`;
    const res = await sanity.fetch(query);
    
    return { data: JSON.stringify(res) };
}
