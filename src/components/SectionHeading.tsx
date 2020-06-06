/**@jsx jsx */
import React, { FC } from 'react';
import { jsx, css } from '@emotion/core';
// @ts-ignore
import subHeadingImg from '../assets/sub-heading.png';

const SectionHeading: FC<{ backImg: boolean }> = ({ children, backImg }) => {
    return (
        <div
            className='sectionHeading'
            css={css`
                position: relative;
                h4 {
                    display: initial;
                    color: #ffc400;
                    font-size: 12px;
                    font-family: 'IBM Plex Sans Condensed', sans-serif;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                :before {
                    content: '';
                    display: block;
                    position: absolute;
                    height: 2px;
                    top: 7px;
                    left: -35px;
                    margin-right: 24px;
                    width: 24px;
                    background: #ffc400;
                }
                :after {
                    ${backImg
                        ? `background-image: url(${subHeadingImg})`
                        : null};
                    content: '';
                    position: absolute;
                    top: -61px;
                    left: -48px;
                    height: 144px;
                    width: 144px;
                    z-index: -1;
                }
            `}>
            <h4>{children}</h4>
        </div>
    );
};

export default SectionHeading;
