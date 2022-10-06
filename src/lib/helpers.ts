export const localeString = (obj: { en?: string, es?: string; }, locale: string): string => {
    return obj[locale] || obj.en;
};
