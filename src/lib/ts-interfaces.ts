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
    children?: { _key: string; _type: string; text?: string; marks: string[], markDefs?: []; }[];
    markDefs?: { _key: string; _type: string; href?: string; }[],
    asset?: SanityImageAssetDocument;
    alt?: string;
    caption?: string;
    keepOriginalSize?: boolean;
}
export interface IContent {
    en?: IContentBlock[];
    es?: IContentBlock[];
    _type?: string;
}

export interface IProject {
    title: {
        en?: string;
        es?: string;
    };
    description: IContent;
    desktopDescription: IContent;
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

export interface IPadrinoPayload {
    email: string | null;
    surname: string | null;
    name: string | null;
    residence: string | null;
    phone?: string | null;
    treeName: string | null;
    treeId: number | null;
    date: Date | null;
    donate: string | null;
}

export interface IPadrinoErrors {
    email: boolean;
    surname: boolean;
    name: boolean;
    residence: boolean;
    phone: boolean;
    treeName: boolean;
    treeId: boolean;
    date: boolean;
}
export interface IPadrinoQuestion {
    what?: string;
    title?: string;
    subtitle?: string;
    text?: string[];
    id?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    images?: { src: string; alt: string }[];
    radioOptions?: string[];
}
