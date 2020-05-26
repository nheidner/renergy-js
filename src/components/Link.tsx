import React, { ReactNode, ReactElement } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import scrollTo from 'gatsby-plugin-smoothscroll';
import { css } from '@emotion/core';
import isHash from '../utils/isHash';

interface ILink {
    (props: {
        children: ReactNode;
        to: string;
        [otherParams: string]: any;
    }): ReactElement;
}

const Link: ILink = ({ children, to, ...other }) => {
    // This example assumes that any internal link (intended for Gatsby)
    // will start with exactly one slash, and that anything else is external.
    const internal = /^\/(?!\/)/.test(to);
    const hash = isHash(to);
    if (hash) {
        return (
            <a
                onClick={() => scrollTo(to)}
                {...other}
                css={css`
                    cursor: pointer;
                `}>
                {children}
            </a>
        );
    }

    // Use Gatsby Link for internal links, and <a> for others
    if (internal) {
        return (
            <GatsbyLink to={to} {...other}>
                {children}
            </GatsbyLink>
        );
    }

    return (
        <a href={to} {...other}>
            {children}
        </a>
    );
};

export default Link;
