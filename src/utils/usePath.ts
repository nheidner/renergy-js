import { makeOptional } from '../types/optionalTypes';

const usePath = (
    pathname: string,
    locales: string[],
    primaryLocale: string
): {
    pathWithoutLocale: string;
    locale: string;
} => {
    for (const locale of locales) {
        if (pathname.includes(`/${locale}/`, 0)) {
            const pathWithoutLocale = pathname.replace(`/${locale}`, '');
            return {
                pathWithoutLocale,
                locale,
            };
        }
    }
    return {
        pathWithoutLocale: pathname,
        locale: primaryLocale,
    };
};

export default usePath;
