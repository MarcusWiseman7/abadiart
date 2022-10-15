import { locale, logoImage, nav } from '$lib/stores';

/** @type {import('./$types').LayoutLoad} */
export function load({ data }) {
    if (data.navObject?.navList) nav.set(data.navObject.navList);
    if (data.logoImageObj) logoImage.set(data.logoImageObj);
    if (data.i18n) locale.set(data.i18n);
    
    return {};
}
