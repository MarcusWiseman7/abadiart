import sanity from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const query = `*[_type == 'home'][0]`;
    const res = await sanity.fetch(query);

    if (res) {
        const { title, description, images } = res;

        return { title: { en: title.en, es: title.es }, description, content: images?.images };
    }

    return {}
}
