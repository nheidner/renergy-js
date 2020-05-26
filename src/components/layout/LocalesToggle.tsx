import React, { FC, ReactElement } from 'react';
import { useLocation } from '@reach/router';
import getLocales, { ILocalesSettings } from '../../utils/getLocales';
import matchPaths from '../../utils/matchPaths';
import useAllPages, { IPageItem } from '../../utils/useAllPages';
import Link from '../Link';

const IntlLink: FC<{
    targetLocale: string;
    targetPath: string;
    localesSettings: ILocalesSettings;
}> = ({
    targetLocale,
    targetPath,
    children,
    localesSettings,
}): ReactElement => {
    const path =
        (targetLocale === localesSettings.primary ? '' : '/' + targetLocale) +
        targetPath;
    const allPages = useAllPages();
    const { pageExists, pathName } = existsPathInPages(allPages, path);

    return (
        <Link
            to={
                pageExists
                    ? pathName
                    : (targetLocale === localesSettings.primary
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
    localesSettings: ILocalesSettings
): {
    pathWithoutLocale: string;
} => {
    const { locales } = localesSettings;
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
    const localesSettings = getLocales();
    const { pathname } = useLocation();
    const { pathWithoutLocale } = returnPathWithoutLocale(
        pathname,
        localesSettings
    );
    return (
        <ul>
            {localesSettings.locales.map((locale, index) => {
                return (
                    <li key={index}>
                        <IntlLink
                            targetLocale={locale}
                            targetPath={pathWithoutLocale}
                            localesSettings={localesSettings}>
                            {locale}
                        </IntlLink>
                    </li>
                );
            })}
        </ul>
    );
};

export default LocalesToggle;
