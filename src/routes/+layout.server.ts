import { locale } from '$lib/stores';
import sanity from '$lib/sanity';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request }) {
    const siteAcceptedLanguages = ['en', 'es'];
    const parsedHeaderLanguages: { locale: string; q: number }[] = [];
    const headerAcceptedLangs: string = request.headers.get('accept-language');
    
    headerAcceptedLangs.split(',').forEach(x => {
        const sub = x.split(';');
        const locale = sub[0].slice(0, 2);
        if (siteAcceptedLanguages.includes(locale)) {
            parsedHeaderLanguages.push({ locale, q: sub[1] ? parseFloat(sub[1].split('=')[1]) : 1 });
        }
    });;
    
    parsedHeaderLanguages.sort((a, b) => {
        if (a.q === b.q) return 0;
        if (a.q > b.q) return -1;
        return 1;
    });
    
    const i18n = parsedHeaderLanguages[0]?.locale || 'en';
    locale.set(i18n);

    // fetch nav from sanity
    const navQuery = `*[_type == 'nav'] {navList}[0]`;
    const navObject = await sanity.fetch(navQuery);

    // fetch logo from sanity
    const logoQuery = `*[_type == 'logo'][0]`;
    const logoImageObj = await sanity.fetch(logoQuery);

    return { logoImageObj, navObject };
}