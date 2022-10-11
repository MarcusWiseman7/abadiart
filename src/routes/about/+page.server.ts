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

        // parse sanity's portableText
        const content: IContent = { en: [], es: [] };
        for (let i = 0, j = contentBlocks.length; i < j; i++) {
            if (contentBlocks[i].blockContent && contentBlocks[i].blockContent) {
                const keys = Object.keys(contentBlocks[i].blockContent).splice(1);

                for (let k = 0, l = keys.length; k < l; k++) {
                    const contentItems = contentBlocks[i].blockContent[keys[k]];
                    
                    for (let m = 0, n = contentItems.length; m < n; m++) {
                        const contentItem = contentItems[m];
                        if (contentItem._key) {
                            let block;
                            
                            if (contentItem._type === 'mainImage') {
                                block = contentItem;
                            } else {
                                block = { _key: contentItem._key, _type: 'text', style: contentItem.style, children: contentItem.children };
                            }
                            
                            content[keys[k] as keyof IContent].push(block);
                        }
                    }
                }
            }
        }

        return { title: { en: title.en, es: title.es }, description, content };
    }

    return {};
}
