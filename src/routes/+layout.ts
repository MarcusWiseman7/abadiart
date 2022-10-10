import { logoImage, nav } from '$lib/stores';

/** @type {import('./$types').LayoutLoad} */
export function load({ data }) {
    if (data.navObject?.navList) nav.set(data.navObject.navList);
    if (data.logoImageObj) logoImage.set(data.logoImageObj);
    
    return {};
}
