import type { IContent } from './ts-interfaces';

export const localeString = (obj: { en?: string, es?: string; }, locale: string): string => {
    return obj[locale as keyof object] || obj.en;
};

export const parsePortableText = (contentBlocks): IContent => {
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
    
    return content;
};
