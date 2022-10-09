import { locale } from '$lib/stores';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ request }) {
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

  return {};
}