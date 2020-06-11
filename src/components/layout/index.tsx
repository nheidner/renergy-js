import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { Global, css } from '@emotion/core';
import Footer from './Footer';
import Header from './Header';
import usePath from '../../utils/usePath';
import useLocales from '../../utils/useLocales';
import { makeOptional } from '../../types/optionalTypes';
import { withPrefix } from 'gatsby';
import siteMetadata from '../siteMetadata';
import { mainTextStyles } from '../../utils/styles';

const globalStyles = css`
    body {
        ${mainTextStyles}
        img {
            margin: 0;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        .h1,
        .h2,
        .h3,
        .h4,
        .h5,
        .h6 {
            font-weight: 700;
            line-height: 1.33;
            color: #ffffff;
        }
    }
`;

/**
 * Layout contains passes currentLocale prop to components
 */
const Layout: FC<{ pageTitle: makeOptional<string> }> = ({
    children,
    pageTitle,
}) => {
    const { locales, primary: primaryLocale } = useLocales();
    const { pathname } = useLocation();
    const { locale: currentLocale, pathWithoutLocale } = usePath(
        pathname,
        locales,
        primaryLocale
    );
    const title = `${siteMetadata().title} - ${pageTitle}`;
    return (
        <div>
            <Helmet>
                <html lang={currentLocale} />
                <title>{title}</title>
                <meta name='description' content={siteMetadata().description} />
                {/* <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href={`${withPrefix('/')}meta_site/logo_bildmarke.png`}
                /> */}
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href={`${withPrefix('/')}meta_site/logo_bildmarke.png`}
                />
                {/*<link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href={`${withPrefix('/')}metaSite/favicon-16x16.png`}
                />
                <link
                    rel='manifest'
                    href={`${withPrefix('/')}metaSite/site.webmanifest`}
                />
                <link
                    rel='mask-icon'
                    href={`${withPrefix(
                        '/'
                    )}metaSite/safari-pinned-tab.svg" color="#da4b40`}
                /> */}
                {/* <meta name='msapplication-TileColor' content='#2b5797' />
                <meta name='theme-color' content='#ffffff' /> */}
            </Helmet>
            <Global styles={globalStyles} />
            <Header
                currentLocale={currentLocale}
                pathWithoutLocale={pathWithoutLocale}
            />
            <div>{children}</div>
            <Footer currentLocale={currentLocale} />
        </div>
    );
};

export default Layout;
