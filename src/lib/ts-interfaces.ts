import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';

export interface Posts {
    title: string;
    slug: string;
    author: {
        name: string;
        image: {};
    };
    mainImage?: {};
    categories?: [
        {
            category: {};
        }
    ];
    publishedAt: Date;
    body: [];
};

export interface IPageData extends SanityDocument {
    title?: { en?: string; es?: string; };
    description?: { en?: string; es?: string; };
}

export interface Logo {
    image: SanityImageAssetDocument;
};

export interface NavList {
    navList: [
        {
            name: {
                en: string;
                es: string;
            };
            href: string;
        }
    ];
};