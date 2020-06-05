interface ILocaleObj {
    en: string;
    de: string;
    [locale: string]: string;
}

export default (localeObj: ILocaleObj, locale: string): string => {
    return localeObj[locale];
};
