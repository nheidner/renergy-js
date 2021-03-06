import { css } from '@emotion/core';
import styled from '@emotion/styled';
import theme from './theme';
import Link from '../components/Link';

export const clearfix = css`
    content: '';
    clear: both;
    display: table;
`;

export const Wrapper = styled.div`
    width: calc(100% - 48px);
    padding: 0 24px;
    margin: 0 auto;
    max-width: calc(${theme.breakpoints[2]}px - 2 * ${theme.margins.margin1});
`;

export const Button = styled(Link)`
    background: #fff;
    color: #252525;
    text-decoration: none;
    font-weight: bold;
    padding: 6px 11px;
    text-transform: uppercase;
    border: none;
    @media (min-width: 450px) {
        padding: 10px 14px;
    }
`;

export const mainTextStyles = css`
    font-family: 'Archivo', Helvetica, Arial, sans-serif;
    margin: 0;
    background: #1c1c1c;
    color: #bbbbbb;
    font-size: 14px;
    line-height: 1.72;
    img {
        display: block;
        margin: 20px auto;
        max-width: 100%;
    }
`;

export const mainTemplateTextStyles = css`
    a {
        border-bottom: 1px dotted #ffc400;
        color: #bbbbbb;
        text-decoration: none;
    }
`;
