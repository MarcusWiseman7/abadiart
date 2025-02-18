import sanity from '$lib/sanity';
import type { LayoutServerLoad } from './$types';
import { UAParser } from 'ua-parser-js';

export const load: LayoutServerLoad = async ({ request }) => {
    const siteAcceptedLanguages = ['en', 'es'];
    const parsedHeaderLanguages: { locale: string; q: number }[] = [];
    const headerAcceptedLangs: string | null = request.headers.get('accept-language');

    const ua = request.headers.get('user-agent');
    const parser = new UAParser(ua);
    const uaResult = parser.getResult();
    const userDevice = uaResult.device.type || 'desktop';

    headerAcceptedLangs?.split(',').forEach((x) => {
        const sub = x.split(';');
        const locale = sub[0].slice(0, 2);
        if (siteAcceptedLanguages.includes(locale)) {
            parsedHeaderLanguages.push({ locale, q: sub[1] ? parseFloat(sub[1].split('=')[1]) : 1 });
        }
    });

    parsedHeaderLanguages.sort((a, b) => {
        if (a.q === b.q) return 0;
        if (a.q > b.q) return -1;
        return 1;
    });

    const i18n = parsedHeaderLanguages[0]?.locale || 'en';

    // fetch nav from sanity
    const navQuery = `*[_type == 'nav'] {navList}[0]`;
    const { navList } = await sanity.fetch(navQuery);

    // fetch logo from sanity
    const logoQuery = `*[_type == 'logo'][0]`;
    const { image } = await sanity.fetch(logoQuery);

    return { data: JSON.stringify({ logo: image, navList, i18n, userDevice }) };
};
