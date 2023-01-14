import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';

export interface ILocaleString {
    en: string;
    es: string;
    _type?: string;
}

export interface IPageData extends SanityDocument {
    title?: ILocaleString;
    description?: string;
}

export interface IContentBlock extends SanityImageAssetDocument {
    _type: string;
    _key: string;
    style: string;
    children?: { _key: string; _type: string; text?: string; marks: string[], markDefs?: []; }[];
    markDefs?: { _key: string; _type: string; href?: string; }[],
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
    title: ILocaleString;
    description: IContent;
    summary?: IContent;
    _key: string;
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

export interface INav {
    name: ILocaleString;
    href: string;
}

export interface IContactPayload {
    email: string;
    name: string;
    subject: string;
    message: string;
    lang: string;
}

export interface IContactErrors {
    email: string;
    name: string;
    subject: string;
    message: string;
}

export interface IPadrinoPayload {
    email: string;
    surname: string;
    name: string;
    residence: string;
    phone?: string;
    treeName: string;
    treeId: number | null;
    color: string;
    adoptionDate: Date | null;
    donate: string | null;
    lang: string;
}

export interface IPadrinoErrors {
    email: string;
    surname: string;
    name: string;
    residence: string;
    phone: string;
    treeName: string;
    treeId: string;
    adoptionDate: string;
}

export interface IPadrinoQuestion {
    what?: string;
    highlightedTitle?: boolean;
    title?: ILocaleString;
    subtitle?: ILocaleString;
    text?: ILocaleString[];
    id?: string;
    label?: ILocaleString;
    placeholder?: ILocaleString;
    required?: boolean;
    type?: string;
    images?: IMainImage[];
    radioOptions?: ILocaleString[];
}
