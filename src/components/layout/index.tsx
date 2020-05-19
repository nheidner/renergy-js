import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

const Layout: FC = ({ children }) => {
    return (
        <div>
            <Helmet></Helmet>
            <div>{children}</div>
        </div>
    );
};

export default Layout;
