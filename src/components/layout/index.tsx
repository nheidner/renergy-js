import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { Global, css } from '@emotion/core';
import Footer from './Footer';
import Header from './Header';
import usePath from '../../utils/usePath';
import useLocales from '../../utils/useLocales';
import { makeOptional } from '../../types/optionalTypes';

const globalStyles = css`
    body {
        font-family: 'Archivo', Helvetica, Arial, sans-serif;
        margin: 0;
        background: #1c1c1c;
        color: #bbbbbb;
        font-size: 14px;
        line-height: 1.72;
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
            font-family: 'Archivo', Helvetica, Arial, sans-serif;
            font-weight: 700;
            line-height: 1.33;
            color: #ffffff;
        }
    }
`;

/**
 * Layout contains passes currentLocale prop to components
 */
const Layout: FC<{ pageTitle?: makeOptional<string> }> = ({
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
    return (
        <div>
            <Helmet></Helmet>
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
