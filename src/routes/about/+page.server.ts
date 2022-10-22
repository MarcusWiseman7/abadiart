import { parsePortableText } from '$lib/helpers';
import sanity from '$lib/sanity';
import type { SanityImageAssetDocument } from '@sanity/client';

interface IContentBlock {
    _type: string;
    _key: string;
    style: string;
    children?: [{ text?: string; marks: string[] }];
    asset?: SanityImageAssetDocument;
    alt?: string;
    caption?: string;
}
interface IContent {
    en: IContentBlock[];
    es: IContentBlock[];
}

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
    const query = `*[_type == 'about'][0]`;
    const res = await sanity.fetch(query);
    
    if (res) {
        const { title, description, contentBlocks } = res;
        const content: IContent = parsePortableText(contentBlocks);

        return { title: { en: title.en, es: title.es }, description, content };
    }

    return {};
}
