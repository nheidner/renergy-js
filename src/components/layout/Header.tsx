/** @jsx jsx */
import React, { FC, useState } from 'react';
import { css, jsx } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import LocalesToggle from './LocalesToggle';
import Menu, {
    IMenuItem,
    IDropdownCarret,
} from '@nteeeeed/react-multilang-menu';
import Link from '../Link';
import useLocales from '../../utils/useLocales';
import { clearfix } from '../../utils/styles';
// @ts-ignore
import logo from '../../assets/big-logo.png';
import theme from '../../utils/theme';
import styled from '@emotion/styled';

const mobileMenuStyles = css`
    @media (min-width: ${theme.breakpoints[1]}px) {
        ul.mobileMenu {
            display: none;
        }
    }

    ul.mobileMenu {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #252525;
    }
    ul.mobileMenu > li  {
    }
    ul.mobileMenu > li a {
        transition: color, 100ms;
        text-decoration: none;
        display: block;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 12px 24px;
        margin: 0;
        color: #ffffff;
        font-family: 'IBM Plex Sans Condensed', sans-serif;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
    }
    ul.mobileMenu > li.hasSubList > a {
    }
    ul.mobileMenu > li.hasSubList > a > em {
        margin-top: 5px;
        float: right;
    }
    ul.mobileMenu > li > ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    ul.mobileMenu > li.hasSubList > ul > li {
        transition: max-height, 200ms;
        transition-delay: 200ms;
        max-height: 0;
        overflow-y: hidden;
    }
    ul.mobileMenu > li.onHover.hasSubList > ul > li {
        max-height: 50px;
        transition-delay: 0;
    }
    ul.mobileMenu > li.onHover a {
        color: #888;
    }
    ul.mobileMenu > li.onHover ul {
    }
    ul.mobileMenu > li > ul > li {
    }
    ul.mobileMenu > li > ul > li > a {
        font-size: 13px;
        padding-left: 50px;
    }
    ul.mobileMenu > li > ul > li > a:hover {
        color: #ccc;
    }
    ul.mobileMenu li.partlyActive > a {
        color: #888;
    }
    ul.mobileMenu li.active > a {
        color: #888;
    }
    ul.mobileMenu > li > ul > li.active > a {
        color: #ffc400;
    }
`;

const menuStyles = css`
    ul.menu {
        ${clearfix}
        list-style: none;
        margin: 0;
        padding: 0;
        text-transform: uppercase;
    }
    ul.menu > li  {
        position: relative;
        float: left;
        padding-left: 0;
        padding-right: 0;
        margin: 0 10px;
    }
    ul.menu > li a {
        transition: color, 100ms;
        display: block;
        padding: 4px 0;
        color: #fff;
        font-family: 'IBM Plex Sans Condensed', sans-serif;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;
    }
    ul.menu > li.hasSubList > a {
        transition-delay: 200ms;
    }
    ul.menu > li > ul {
        position: absolute;
        display: block;
        min-width: 100%;
        box-sizing: border-box;
        opacity: 0;
        transition: opacity 100ms;
        transition-timing-function: ease;
        transition-delay: 200ms;
        padding: 5px 15px 5px 10px;
        margin: 2px 0 0 -2px;
        list-style: none;
        font-size: 14px;
        text-align: left;
        background-color: #252525;
        border: 1px solid #222;
        border-radius: 0;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        background-clip: padding-box;
    }
    ul.menu > li.onHover ul {
        opacity: 1;
        transition-delay: 0ms;
    }
    ul.menu > li.onHover a {
        color: #888;
        transition-delay: 0ms;
    }
    ul.menu > li > ul > li {
        float: none;
        margin: 0;
    }
    ul.menu > li > ul > li > a {
        color: #888;
        padding: 3px 0;
        line-height: 1.72;
    }
    ul.menu > li > ul > li > a:hover {
        color: #ccc;
    }
    ul.menu li.partlyActive > a {
        color: #888;
    }
    ul.menu li.active > a {
        color: #888;
    }
    ul.menu > li > ul > li.active > a {
        color: #ffc400;
    }
    @media (max-width: ${theme.breakpoints[1]}px) {
        ul.menu {
            display: none;
        }
    }
`;

const localesToggleStyles = css`
    @media (max-width: ${theme.breakpoints[1]}px) {
        float: right;
    }
    min-width: 65px;
    list-style: none;
    padding-left: 0;
    margin: 0;
    li {
        float: left;
        padding: 2px 6px;
        position: relative;
    }
    li:last-of-type::before {
        content: '|';
        color: #fff;
        font-size: 22px;
        font-weight: normal;
        position: absolute;
        left: -3px;
        top: -1px;
    }

    a {
        transition: color, 200ms;
        text-decoration: none;
        font-weight: bold;
        color: #fff;
    }
    a:hover {
    }
    li.active a {
        color: #888;
        text-decoration: none;
    }
`;

const HeaderTemplate: FC<{
    menuItems: IMenuItem[];
    currentLocale: string;
    pathWithoutLocale: string;
}> = ({ menuItems, currentLocale, pathWithoutLocale }) => {
    const [showMenu, setShowMenu] = useState(false);

    const { primary: primaryLocale } = useLocales();

    const MenuToggle: FC = () => {
        return (
            <div
                onClick={() => setShowMenu(!showMenu)}
                css={css`
                    @media (min-width: ${theme.breakpoints[1]}px) {
                        display: none;
                    }
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    position: relative;
                    cursor: pointer;
                    span {
                        background-color: ${showMenu ? '#888' : '#fff'};
                        transition: background-color, 200ms;
                        width: 23px;
                        height: 2px;
                        display: block;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-left: -10px;
                    }
                    span:nth-of-type(1) {
                        margin-top: -7px;
                    }
                    span:nth-of-type(2) {
                        margin-top: 0px;
                    }
                    span:nth-of-type(3) {
                        margin-top: 7px;
                    }
                `}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    };

    const DropDownCarret: IDropdownCarret = () => {
        return (
            <em
                css={css`
                    display: inline-block;
                    width: 0;
                    height: 0;
                    margin: 0 0 2px 4px;
                    vertical-align: middle;
                    border-top: 4px dashed;
                    border-right: 4px solid transparent;
                    border-left: 4px solid transparent;
                    border-bottom-width: 0;
                    border-style: solid;
                `}
            />
        );
    };

    const LocalesToggleWrapper = styled('div')`
        @media (max-width: ${theme.breakpoints[1]}px) {
            width: 80%;
        }
    `;

    return (
        <React.Fragment>
            <header
                css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 40px 24px;
                    ${menuStyles}
                `}>
                <img
                    src={logo}
                    alt='logo'
                    css={css`
                        width: 80px;
                    `}
                />
                <Menu
                    menuItems={menuItems}
                    activeLocale={currentLocale}
                    activePathWithoutLocale={pathWithoutLocale}
                    Link={Link}
                    primaryLocale={primaryLocale}
                    DropdownCarret={DropDownCarret}
                    classNameForTopElement='menu'
                />
                <LocalesToggleWrapper>
                    <LocalesToggle css={localesToggleStyles} />
                </LocalesToggleWrapper>
                <MenuToggle />
            </header>
            <div
                css={css`
                    position: absolute;
                    width: 100%;
                    max-height: ${showMenu ? '1000px' : '0'};
                    transition: max-height, 350ms;
                    overflow-y: hidden;
                    ${mobileMenuStyles}
                `}>
                <Menu
                    menuItems={menuItems}
                    activeLocale={currentLocale}
                    activePathWithoutLocale={pathWithoutLocale}
                    Link={Link}
                    primaryLocale={primaryLocale}
                    DropdownCarret={DropDownCarret}
                    classNameForTopElement='mobileMenu'
                />
            </div>
        </React.Fragment>
    );
};

interface TData {
    site: {
        siteMetadata: {
            menu: IMenuItem[];
        };
    };
}

const Header: FC<{
    currentLocale: string;
    pathWithoutLocale: string;
}> = ({ currentLocale, pathWithoutLocale }) => {
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
            pathWithoutLocale={pathWithoutLocale}
        />
    );
};

export default Header;
