import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { Global, css } from '@emotion/core';
import Footer from './Footer';
import Header from './Header';
import usePath from '../../utils/usePath';
import useLocales from '../../utils/useLocales';

const globalStyles = css`
    body {
        font-family: 'Archivo', Helvetica, Arial, sans-serif;
        margin: 0;
        background: #1c1c1c;
        color: #bbbbbb;
    }
`;

/**
 * Layout contains passes currentLocale prop to components
 */
const Layout: FC = ({ children }) => {
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
