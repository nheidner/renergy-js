/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Link from '../components/Link';
import { IndexQuery } from '../../gatsby-graphql';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { openerImageFragment, thumbNail, client } from '../utils/fragment';
import Img, { FluidObject } from 'gatsby-image';
import Content from '../components/Content';
import theme from '../utils/theme';
// @ts-ignore
import subHeadingImg from '../assets/sub-heading.png';

const SectionHeading: FC = ({ children }) => {
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
                    background-image: url(${subHeadingImg});
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

const MoreButton = styled(Link)``;

const Section = styled('section')`
    max-width: 720px;
    margin-bottom: 100px;
    padding: 24px;
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
        <div>
            <Carousel
                css={css`
                    margin-bottom: 100px;
                `}
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
                            <div
                                css={css`
                                    position: absolute;
                                    top: 5%;
                                    left: 5%;
                                    text-align: left;
                                `}>
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
                                <MoreButton to={opener?.link?.href as string}>
                                    {opener?.link?.text}
                                </MoreButton>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
            <Section
                css={css`
                    div.gatsby-image-wrapper {
                        margin-bottom: 48px;
                    }
                    h3 {
                        font-size: 24px;
                        letter-spacing: -1.3px;
                        margin: 24px 0;
                        font-family: 'Archivo', Helvetica, Arial, sans-serif;
                        font-weight: 700;
                        line-height: 1.33;
                        color: #ffffff;
                    }
                    div.excerpt {
                        margin: 0 0 24px;
                    }
                    div.excerpt {
                        margin: 0 0 10px;
                    }
                `}>
                <Img
                    fluid={
                        introducing?.image?.source?.childImageSharp
                            ?.fluid as FluidObject
                    }
                    alt={introducing?.image?.alt as string}
                />
                <SectionHeading>{introducing?.topic}</SectionHeading>
                <h3>{introducing?.heading}</h3>
                <div className='excerpt'>
                    <Content markdown={introducing?.text as string} />
                </div>
                <MoreButton to={introducing?.link?.href as string}>
                    {introducing?.link?.text}
                </MoreButton>
            </Section>
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
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        margin: 0 auto;
                        max-width: 170px;
                    }
                `}>
                <SectionHeading>{clients?.topic}</SectionHeading>
                <div className='bodyWrapper'>
                    {clients?.clients_list?.map((clientItem, index) => {
                        return (
                            <Link
                                key={index}
                                to={clientItem?.link?.href as string}>
                                <Img
                                    fluid={
                                        clientItem?.image?.source
                                            ?.childImageSharp
                                            ?.fluid as FluidObject
                                    }
                                    alt={clientItem?.image?.alt as string}
                                />
                            </Link>
                        );
                    })}
                </div>
            </Section>
            <Section
                css={css`
                    div.gatsby-image-wrapper  {
                        margin-bottom: 48px;
                    }
                    div.sectionHeading {
                        margin-bottom: 24px;
                    }
                    h2 {
                        max-width: 336px;
                        margin-top: 0;
                        margin-bottom: 48px;
                        font-size: 40px;
                    }
                    section {
                        margin-bottom: 48px;
                    }
                    section h5 {
                        color: #888888;
                        font-size: 11px;
                        font-family: 'IBM Plex Sans Condensed', sans-serif;
                        font-weight: 400;
                        text-transform: uppercase;
                        margin-bottom: 6px;
                    }
                    section p {
                        margin: 0 0 2px;
                    }
                    section a {
                        border-bottom: 1px dotted #ffc400;
                        color: #bbb;
                        text-decoration: none;
                    }
                `}>
                <Img
                    fluid={
                        contact?.image?.source?.childImageSharp
                            ?.fluid as FluidObject
                    }
                    alt={contact?.image?.alt as string}
                />
                <SectionHeading>{contact?.topic}</SectionHeading>
                <h2>{contact?.heading}</h2>
                <section>
                    <h5>{contact?.office_germany?.heading}</h5>
                    {contact?.office_germany?.address?.map(
                        (addressLine, index) => {
                            return <p key={index}>{addressLine?.line}</p>;
                        }
                    )}
                </section>
                <section>
                    <h5>{contact?.get_in_touch?.heading}</h5>
                    <p>{contact?.get_in_touch?.telephone}</p>
                    <p>
                        <Link to={contact?.get_in_touch?.email?.href as string}>
                            {contact?.get_in_touch?.email?.text}
                        </Link>
                    </p>
                </section>
                <section>
                    <h5>{contact?.office_uae?.heading}</h5>
                    {contact?.office_uae?.address?.map((addressLine, index) => {
                        return <p key={index}>{addressLine?.line}</p>;
                    })}
                </section>
                <MoreButton to={contact?.link?.href as string}>
                    {contact?.link?.text}
                </MoreButton>
            </Section>
        </div>
    );
};

const Index: FC<{ data: IndexQuery }> = ({ data }) => {
    console.log('data: ', data);
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

export const indexQuery = graphql`
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
                    clients_list {
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
                contact {
                    topic
                    heading
                    image {
                        source {
                            ...thumbNail
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
                    office_uae {
                        heading
                        address {
                            line
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
