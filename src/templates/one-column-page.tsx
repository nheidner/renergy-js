/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { OneColumnPageQuery } from '../../gatsby-graphql';
import Img, { FluidObject } from 'gatsby-image';
import { openerImage, teamPerson } from '../utils/fragment';
import Content from '../components/Content';
import { Wrapper } from '../utils/styles';
import theme from '../utils/theme';

type TMarkdownRemark = OneColumnPageQuery[keyof OneColumnPageQuery] & {
    [name: string]: OneColumnPageQuery[keyof OneColumnPageQuery];
};

type TIndexTemplate = TMarkdownRemark['frontmatter'];

export const IndexTemplate: FC<TIndexTemplate> = ({
    opener_image,
    content,
    team_list,
}) => (
    <Wrapper>
        <div
            css={css`
                background: #252525;
            `}>
            <Img
                fluid={
                    opener_image?.source?.childImageSharp?.fluid as FluidObject
                }
                alt={opener_image?.alt as string}
                css={css`
                    margin-bottom: 40px;
                `}
            />
            <div
                css={css`
                    padding: 0 ${theme.margins.margin1};
                    h2 {
                        color: #bbb;
                    }
                `}>
                <Content
                    markdown={content as string}
                    css={css`
                        margin-bottom: 70px;
                    `}
                />
                <div
                    css={css`
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        max-width: 970px;
                        margin: auto;
                        > div {
                            width: 250px;
                            margin-bottom: 70px;
                        }
                        > div div.gatsby-image-wrapper {
                            width: 160px;
                            margin: 0 auto 14px;
                        }
                        > div > p {
                            margin: auto;
                            text-align: center;
                            font-size: 17px;
                            font-weight: bold;
                        }
                        > div > p.name {
                            font-size: 17px;
                            color: #eee;
                        }
                        > div > p.role {
                            font-size: 15px;
                            color: #bbb;
                        }
                    `}>
                    {team_list?.map((person, index) => {
                        return (
                            <div key={index}>
                                <Img
                                    fluid={
                                        person?.image?.source?.childImageSharp
                                            ?.fluid as FluidObject
                                    }
                                    alt={person?.image?.alt as string}
                                    style={{
                                        borderRadius: '3%',
                                    }}
                                />
                                <p className='name'>{person?.name}</p>
                                <p className='role'>{person?.role}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </Wrapper>
);

const Index: FC<{ data: OneColumnPageQuery }> = ({ data }) => {
    const { frontmatter } = data.markdownRemark || {};

    return (
        <Layout>
            <IndexTemplate
                content={frontmatter?.content}
                opener_image={frontmatter?.opener_image}
                team_list={frontmatter?.team_list}
            />
        </Layout>
    );
};

export const oneColumnPageQuery = graphql`
    query OneColumnPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                content
                opener_image {
                    source {
                        ...openerImage
                    }
                    alt
                }
                team_list {
                    image {
                        source {
                            ...teamPerson
                        }
                        alt
                    }
                    name
                    role
                }
            }
        }
    }
`;

export default Index;
