import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';

// export interface Posts {
//     title: string;
//     slug: string;
//     author: {
//         name: string;
//         image: {};
//     };
//     mainImage?: {};
//     categories?: [
//         {
//             category: {};
//         }
//     ];
//     publishedAt: Date;
//     body: [];
// };

export interface IPageData extends SanityDocument {
    title?: { en?: string; es?: string; };
    description?: string;
}

export interface IContentBlock {
    _type: string;
    _key: string;
    style: string;
    children?: [{ text?: string; marks: string[] }];
    asset?: SanityImageAssetDocument;
    alt?: string;
    caption?: string;
    keepOriginalSize?: boolean;
}
export interface IContent {
    en: IContentBlock[];
    es: IContentBlock[];
    _type?: string;
}

export interface IMessage {
    message: string;
    timeout: number;
    type: string;
    id: number;
}

export interface IMainImage extends SanityImageAssetDocument {
    alt?: string;
    caption?: string;
}

export interface ILocaleString {
    en: string;
    es: string;
    _type?: string;
}

export interface INav {
    name: ILocaleString;
    href: string;
}
