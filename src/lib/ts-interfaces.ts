import type { SanityImageAssetDocument } from '@sanity/client';

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