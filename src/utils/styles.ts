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
    margin: auto;
    /* @media (min-width: ${theme.breakpoints[0]}px) {
        width: calc(${theme.breakpoints[0]}px - 2 * ${theme.margins.margin1});
    }
    @media (min-width: ${theme.breakpoints[1]}px) {
        width: calc(${theme.breakpoints[1]}px - 2 * ${theme.margins.margin1});
    } */
    @media (min-width: ${theme.breakpoints[2]}px) {
        width: calc(${theme.breakpoints[2]}px - 2 * ${theme.margins.margin1});
    }
`;

export const Button = styled(Link)``;
