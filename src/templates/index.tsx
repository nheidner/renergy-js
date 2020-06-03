/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Link from '../components/Link';
import { IndexQuery } from '../../gatsby-graphql';
import { makeOptional } from '../types/optionalTypes';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { openerImageFragment, personImg } from '../utils/fragment';
import Img, { FluidObject } from 'gatsby-image';
import Content from '../components/Content';
import theme from '../utils/theme';

const Heading = styled('h1')`
    font-size: 30px;
    margin-top: 0;
`;

type TMarkdownRemark = IndexQuery[keyof IndexQuery] & {
    [name: string]: IndexQuery[keyof IndexQuery];
};

type TIndexTemplate = TMarkdownRemark['frontmatter'];

export const IndexTemplate: FC<TIndexTemplate> = ({
    openers,
    introducing,
    clients,
    contact,
}) => {
    return (
        <div
            css={css`
                background-color: #ddd;
            `}>
            <section>
                <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    showStatus={false}
                    autoPlay={true}
                    interval={3000}
                    transitionTime={350}
                    dynamicHeight={true}
                    useKeyboardArrows={true}
                    showArrows={false}
                    swipeable={true}>
                    {openers?.map((opener, index) => {
                        return (
                            <div key={index}>
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
                                    alt={opener?.image?.alt as string}></Img>
                                <Link
                                    to={opener?.heading?.href as string}
                                    css={css`
                                        font-size: 40px;
                                        @media (min-width: ${theme
                                                .breakpoints[0]}px) {
                                            font-size: 60px;
                                        }
                                        @media (min-width: ${theme
                                                .breakpoints[1]}px) {
                                            font-size: 80px;
                                        }

                                        line-height: 120%;
                                        color: #fff;
                                        position: absolute;
                                        text-align: left;
                                        top: 5%;
                                        left: 5%;
                                        p {
                                            margin: 0;
                                        }
                                    `}>
                                    <Content
                                        markdown={
                                            opener?.heading?.text as string
                                        }
                                    />
                                </Link>
                                <Link to={opener?.link?.href as string}>
                                    {opener?.link?.text}
                                </Link>
                            </div>
                        );
                    })}
                </Carousel>
            </section>
            <Link
                to='/'
                css={css`
                    background-color: #aaa;
                `}>
                hello world
            </Link>
        </div>
    );
};

const Index = ({ data }: { data: IndexQuery }) => {
    const { frontmatter } = data.markdownRemark || {};

    return (
        <Layout pageTitle={frontmatter?.pageTitle}>
            <IndexTemplate
                openers={frontmatter?.openers}
                introducing={frontmatter?.introducing}
                clients={frontmatter?.clients}
                contact={frontmatter?.contact}
            />
        </Layout>
    );
};

export const pageQuery = graphql`
    query Index($locale: String) {
        markdownRemark(
            frontmatter: {
                templateKey: { eq: "index" }
                locale: { eq: $locale }
            }
        ) {
            frontmatter {
                pageTitle
                openers {
                    image {
                        source {
                            ...openerImageFragment
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
                            ...personImg
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
                    clients_list {
                        image {
                            source {
                                ...personImg
                            }
                            alt
                        }
                        link {
                            href
                        }
                    }
                }
                contact {
                    topic
                    heading
                    image {
                        source {
                            ...personImg
                        }
                        alt
                    }
                    office_germany {
                        heading
                        address {
                            line
                        }
                    }
                    get_in_touch {
                        heading
                        telephone
                        email {
                            text
                            href
                        }
                    }
                    link {
                        text
                        href
                    }
                }
            }
        }
    }
`;

export default Index;
