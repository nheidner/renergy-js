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
            />
            <div
                css={css`
                    padding: ${theme.margins.margin1};
                    h2 {
                        color: #bbb;
                    }
                `}>
                <Content markdown={content as string} />
                <div
                    css={css`
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        > div {
                            width: 23%;
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
                                        height: '160px',
                                    }}
                                    imgStyle={{}}
                                />
                                <p>{person?.name}</p>
                                <p>{person?.role}</p>
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
    console.log(data);

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
