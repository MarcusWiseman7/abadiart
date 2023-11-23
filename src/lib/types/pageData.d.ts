import type { SanityDocument } from '@sanity/client';
import type { ILocaleString } from '$lib/ts-interfaces';

export interface IPageData extends SanityDocument {
    title?: ILocaleString;
    description?: string;
}
