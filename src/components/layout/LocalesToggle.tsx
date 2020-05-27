import React, { FC, ReactElement } from 'react';
import { useLocation } from '@reach/router';
import useLocales from '../../utils/useLocales';
import matchPaths from '../../utils/matchPaths';
import useAllPages, { IPageItem } from '../../utils/useAllPages';
import Link from '../Link';

const IntlLink: FC<{
    targetLocale: string;
    targetPath: string;
    primaryLocale: string;
}> = ({ targetLocale, targetPath, primaryLocale, children }): ReactElement => {
    const path =
        (targetLocale === primaryLocale ? '' : '/' + targetLocale) + targetPath;
    const { allPages } = useAllPages();
    const { pageExists, pathName } = existsPathInPages(allPages, path);

    return (
        <Link
            to={
                pageExists
                    ? pathName
                    : (targetLocale === primaryLocale
                          ? ''
                          : '/' + targetLocale) + '/'
            }>
            {children}
        </Link>
    );
};

const existsPathInPages = (
    pages: IPageItem[],
    path: string
): { pageExists: boolean; pathName: string } => {
    for (const page of pages) {
        if (matchPaths(page.node.fields.slug, path)) {
            return { pageExists: true, pathName: path };
        }
    }

    return { pageExists: false, pathName: '' };
};

const returnPathWithoutLocale = (
    pathname: string,
    locales: string[]
): {
    pathWithoutLocale: string;
} => {
    for (const locale of locales) {
        if (pathname.includes(`/${locale}/`, 0)) {
            const pathWithoutLocale = pathname.replace(`/${locale}`, '');
            return {
                pathWithoutLocale,
            };
        }
    }
    return {
        pathWithoutLocale: pathname,
    };
};

const LocalesToggle = () => {
    const { locales, primary } = useLocales();
    const { pathname } = useLocation();
    const { pathWithoutLocale } = returnPathWithoutLocale(pathname, locales);
    return (
        <ul>
            {locales.map((locale, index) => {
                return (
                    <li key={index}>
                        <IntlLink
                            targetLocale={locale}
                            targetPath={pathWithoutLocale}
                            primaryLocale={primary}>
                            {locale}
                        </IntlLink>
                    </li>
                );
            })}
        </ul>
    );
};

export default LocalesToggle;
