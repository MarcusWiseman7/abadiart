import sanity from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const query = `*[_type == 'contact'][0]`;
    const res = await sanity.fetch(query);
    if (res) return res;
}
