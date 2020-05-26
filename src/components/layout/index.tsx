import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import LocalesToggle from './LocalesToggle';

const Layout: FC = ({ children }) => {
    return (
        <div>
            <LocalesToggle />
            <Helmet></Helmet>
            <div>{children}</div>
        </div>
    );
};

export default Layout;
