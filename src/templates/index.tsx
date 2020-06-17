/** @jsx jsx */
import React, { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Link from '../components/Link';
import { IndexQuery } from '../../gatsby-graphql';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { openerImageGallery, thumbNail, client } from '../utils/fragment';
import Img, { FluidObject } from 'gatsby-image';
import Content from '../components/Content';
import theme from '../utils/theme';
import { Wrapper, Button, mainTextStyles } from '../utils/styles';
import SectionHeading from '../components/SectionHeading';

const Section = styled('section')`
    margin-bottom: 100px;
`;

type TMarkdownRemark = IndexQuery[keyof IndexQuery] & {
    [name: string]: IndexQuery[keyof IndexQuery];
};

type TIndexTemplate = TMarkdownRemark['frontmatter'] & {
    preview?: boolean;
};

export const IndexTemplate: FC<TIndexTemplate> = ({
    openers,
    introducing,
    clients,
}) => {
    return (
        <div
            css={css`
                ${mainTextStyles}
            `}>
            <Carousel
                css={css`
                    margin: auto;
                    @media (min-width: 1500px) {
                        width: calc(${theme.maxWidths.contentMaxWidth} - 48px);
                    }
                    img {
                        margin: 0;
                    }

                    margin-bottom: 100px;
                `}
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                // autoPlay={true}
                interval={3000}
                transitionTime={500}
                dynamicHeight={true}
                useKeyboardArrows={true}
                showArrows={false}
                swipeable={true}>
                {openers?.map((opener, index) => {
                    return (
                        <div key={index}>
                            {opener?.image?.source?.childImageSharp ? (
                                <Img
                                    fluid={
                                        opener?.image?.source?.childImageSharp
                                            ?.fluid as FluidObject
                                    }
                                    style={{
                                        width: '100%',
                                    }}
                                    imgStyle={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                    alt={opener?.image?.alt as string}
                                />
                            ) : (
                                <img
                                    src={opener?.image?.source as string}
                                    alt={opener?.image?.alt as string}
                                    css={css`
                                        display: block;
                                        width: 100%;
                                        height: auto;
                                    `}
                                />
                            )}

                            <div
                                css={css`
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    text-align: left;
                                `}>
                                <div
                                    css={css`
                                        padding: 0 24px 0;
                                        margin: 0 auto;
                                    `}>
                                    <div
                                        css={css`
                                            max-width: calc(1300px - 48px);
                                            margin: 2.5% auto 0;
                                        `}>
                                        <Link
                                            to={opener?.heading?.href as string}
                                            css={css`
                                                font-size: 25px;
                                                text-decoration: none;
                                                display: block;
                                                margin-bottom: 4%;
                                                @media (min-width: 380px) {
                                                    font-size: 32px;
                                                }
                                                @media (min-width: 500px) {
                                                    font-size: 37px;
                                                }
                                                @media (min-width: 700px) {
                                                    font-size: 55px;
                                                }
                                                @media (min-width: ${theme
                                                        .breakpoints[1]}px) {
                                                    font-size: 85px;
                                                }
                                                color: #fff;

                                                p {
                                                    margin: 0;
                                                    line-height: 1.2;
                                                }
                                            `}>
                                            <Content
                                                markdown={
                                                    opener?.heading
                                                        ?.text as string
                                                }
                                            />
                                        </Link>
                                        <Button
                                            to={opener?.link?.href as string}>
                                            {opener?.link?.text}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
            <Wrapper>
                {introducing ? (
                    <Section
                        css={css`
                            div.gatsby-image-wrapper {
                                margin-bottom: 48px;
                            }
                            h3 {
                                font-size: 24px;
                                letter-spacing: -1.3px;
                                margin: 24px 0;
                                font-weight: 700;
                                line-height: 1.33;
                                color: #ffffff;
                            }
                            div.excerpt {
                                margin: 0 0 24px;
                            }
                            div.excerpt {
                                margin: 0 0 48px;
                            }
                            @media (min-width: ${theme.breakpoints[0]}px) {
                                display: flex;
                                flex-direction: row-reverse;
                                justify-content: space-between;
                                align-items: center;

                                > div.image {
                                    width: 50%;
                                }
                                > div.text {
                                    width: 40%;
                                }
                                div.gatsby-image-wrapper {
                                    margin-bottom: 0;
                                }
                            }
                        `}>
                        <div className='image'>
                            {introducing?.image?.source?.childImageSharp ? (
                                <Img
                                    fluid={
                                        introducing?.image?.source
                                            ?.childImageSharp
                                            ?.fluid as FluidObject
                                    }
                                    alt={introducing?.image?.alt as string}
                                />
                            ) : (
                                <div className='gatsby-image-wrapper'>
                                    <img
                                        src={
                                            introducing?.image?.source as string
                                        }
                                        alt={introducing?.image?.alt as string}
                                        css={css`
                                            width: 100%;
                                            display: block;
                                        `}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='text'>
                            <SectionHeading backImg>
                                {introducing?.topic}
                            </SectionHeading>
                            <h3>{introducing?.heading}</h3>
                            <div className='excerpt'>
                                <Content
                                    markdown={introducing?.text as string}
                                />
                            </div>
                            <Button to={introducing?.link?.href as string}>
                                {introducing?.link?.text}
                            </Button>
                        </div>
                    </Section>
                ) : null}
                {clients ? (
                    <Section
                        css={css`
                            > div.sectionHeading {
                                margin-bottom: 24px;
                            }
                            > div.bodyWrapper {
                                display: flex;
                                justify-content: space-between;
                                flex-wrap: wrap;
                            }
                            > div.bodyWrapper a {
                                display: block;
                                height: 120px;
                                width: 100%;
                                @media (min-width: 400px) {
                                    width: 45%;
                                }
                                @media (min-width: 650px) {
                                    width: 22%;
                                }
                                margin-bottom: 20px;
                                padding: 20px 3px;
                                background-color: #252525;
                                transition: background-color, 150ms;
                                position: relative;
                            }
                            > div.bodyWrapper a:hover {
                                background-color: #000;
                            }
                            > div.bodyWrapper a div.gatsby-image-wrapper {
                                max-width: 170px;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                            }
                            > div.bodyWrapper a img.gatsby-image-wrapper {
                                max-width: 170px;
                                width: calc(100% - 6px);
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                            }
                        `}>
                        <SectionHeading backImg>
                            {clients?.topic}
                        </SectionHeading>
                        <div className='bodyWrapper'>
                            {clients?.clientsList?.map((clientItem, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to={clientItem?.link?.href as string}>
                                        {clientItem?.image?.source
                                            ?.childImageSharp ? (
                                            <Img
                                                fluid={
                                                    clientItem?.image?.source
                                                        ?.childImageSharp
                                                        ?.fluid as FluidObject
                                                }
                                                alt={
                                                    clientItem?.image
                                                        ?.alt as string
                                                }
                                            />
                                        ) : (
                                            <div
                                                css={css`
                                                    width: 100%;
                                                    height: 100%;
                                                `}>
                                                <img
                                                    className='gatsby-image-wrapper'
                                                    src={
                                                        clientItem?.image
                                                            ?.source as string
                                                    }
                                                    alt={
                                                        clientItem?.image
                                                            ?.alt as string
                                                    }
                                                    css={css`
                                                        display: block;
                                                        width: 100%;
                                                    `}
                                                />
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </Section>
                ) : null}
            </Wrapper>
        </div>
    );
};

const Index: FC<{ data: IndexQuery }> = ({ data }) => {
    const { frontmatter } = data.markdownRemark || {};
    console.log(frontmatter?.openers);

    return (
        <Layout pageTitle={frontmatter?.pageTitle}>
            <IndexTemplate
                openers={frontmatter?.openers}
                introducing={frontmatter?.introducing}
                clients={frontmatter?.clients}
            />
        </Layout>
    );
};

export const indexQuery = graphql`
    query Index($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                pageTitle
                openers {
                    image {
                        source {
                            ...openerImageGallery
                        }
                        alt
                    }
                    link {
                        text
                        href
                    }
                    heading {
                        text
                        href
                    }
                }
                introducing {
                    topic
                    heading
                    text
                    image {
                        source {
                            ...thumbNail
                        }
                        alt
                    }
                    link {
                        text
                        href
                    }
                }
                clients {
                    topic
                    clientsList {
                        image {
                            source {
                                ...client
                            }
                            alt
                        }
                        link {
                            href
                        }
                    }
                }
            }
        }
    }
`;

export default Index;
