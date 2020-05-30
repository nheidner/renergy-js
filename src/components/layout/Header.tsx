/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import LocalesToggle from './LocalesToggle';

const navListStyles = css``;

interface IMenuItem {
    item: {
        en: string;
        de: string;
        [locale: string]: string;
    };
    to: string;
    children: IMenuItem[] | undefined;
}

interface INavProps {
    menuItems: IMenuItem[];
    currentLocale: string;
}

const NavList: FC<INavProps & { level: number }> = ({
    menuItems,
    currentLocale,
    level,
}) => {
    return (
        <ul css={navListStyles}>
            {menuItems.map((menuItem, index) => {
                return (
                    <li key={index}>
                        {menuItem.item[currentLocale]}
                        {menuItem.children && (
                            <NavList
                                menuItems={menuItem.children}
                                currentLocale={currentLocale}
                                level={level + 1}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

const Nav: FC<INavProps> = ({ menuItems, currentLocale }) => {
    return (
        <nav>
            <NavList
                menuItems={menuItems}
                currentLocale={currentLocale}
                level={0}
            />
        </nav>
    );
};

const HeaderTemplate: FC<INavProps> = ({ menuItems, currentLocale }) => {
    return (
        <div>
            <Nav menuItems={menuItems} currentLocale={currentLocale} />
            <LocalesToggle />
        </div>
    );
};

interface IHeaderProps {
    currentLocale: string;
}

interface TData {
    site: {
        siteMetadata: {
            menu: IMenuItem[];
        };
    };
}

const Header: FC<IHeaderProps> = ({ currentLocale }) => {
    const queryResult = useStaticQuery<TData>(
        graphql`
            query {
                site {
                    siteMetadata {
                        menu {
                            item {
                                en
                                de
                            }
                            to
                            children {
                                item {
                                    en
                                    de
                                }
                                to
                            }
                        }
                    }
                }
            }
        `
    );

    return (
        <HeaderTemplate
            menuItems={queryResult.site.siteMetadata.menu}
            currentLocale={currentLocale}
        />
    );
};

export default Header;
