import type { IContent, ILocaleString } from './ts-interfaces';

export const localeString = (obj: { en?: string, es?: string; }, locale: string): string => {
    return obj[locale as keyof object] || obj.en;
};

export const parseContentToText = (content: IContent): ILocaleString => {
    const contentCopy: IContent = JSON.parse(JSON.stringify(content));
    const newLocaleString: ILocaleString = { en: '', es: '' };
    
    for (const key in contentCopy) {
        const arr = contentCopy[key as keyof IContent];
        
        if (['en', 'es'].includes(key) && typeof arr === 'object') {
            for (const block of arr) {
                if (block._type === 'block' && block.children?.length) {
                    for (const child of block.children) {
                        newLocaleString[key as keyof ILocaleString] += child.text;
                    }
                }
            }
        }
    }

    return newLocaleString;
};

export const getDesktopIContent = (baseVersion: IContent): IContent => {
    const desktopVersion: IContent = JSON.parse(JSON.stringify(baseVersion));
        
    for (const key in desktopVersion) {
        const arr = desktopVersion[key as keyof IContent];

        if (['en', 'es'].includes(key) && typeof arr === 'object') {
            for (let i = 0, j = arr.length; i < j; i++) {
                if (arr[i]._type === 'mainImage') {
                    // move up to be under previous heading
                    let new_index = i - 1;
                    while (!['h1', 'h2', 'h3', 'h4'].includes(arr[new_index].style) && arr[new_index]._type !== 'mainImage' && new_index >= 0) new_index--;
                    arr.splice(new_index + 1, 0, arr.splice(i, 1)[0]);
                }
            }
        }
    }

    return desktopVersion;
};
