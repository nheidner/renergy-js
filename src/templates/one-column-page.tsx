/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { OneColumnPageQuery } from '../../gatsby-graphql';
import Img, { FluidObject } from 'gatsby-image';
import { openerImageFragment, teamPerson } from '../utils/fragment';
import Content from '../components/Content';
import { Wrapper, mainTextStyles } from '../utils/styles';
import theme from '../utils/theme';

type TMarkdownRemark = OneColumnPageQuery[keyof OneColumnPageQuery] & {
    [name: string]: OneColumnPageQuery[keyof OneColumnPageQuery];
};

type TOneColumnPageTemplate = TMarkdownRemark['frontmatter'];

export const OneColumnPageTemplate: FC<TOneColumnPageTemplate> = ({
    openerImage,
    content,
    teamList,
}) => (
    <Wrapper>
        <div
            css={css`
                background: #252525;
                > img {
                    width: 100%;
                }
                div.gatsby-image-wrapper  {
                    margin-bottom: 40px;
                }
            `}>
            {openerImage?.source?.childImageSharp ? (
                <Img
                    fluid={
                        openerImage?.source?.childImageSharp
                            ?.fluid as FluidObject
                    }
                    alt={openerImage?.alt as string}
                />
            ) : (
                <div>
                    <img
                        src={openerImage?.source as string}
                        alt={openerImage?.alt as string}
                    />
                </div>
            )}

            <div
                css={css`
                    padding: 0 ${theme.margins.margin1};
                    h2,
                    h3 {
                        color: #bbb;
                    }
                    ${mainTextStyles}
                    background-color: #252525;
                `}>
                <Content
                    markdown={content as string}
                    css={css`
                        padding: 0 40px 70px;
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
                    {teamList && teamList.length > 0
                        ? teamList?.map((person, index) => {
                              return (
                                  <div key={index}>
                                      {person?.image?.source
                                          ?.childImageSharp ? (
                                          <Img
                                              fluid={
                                                  person?.image?.source
                                                      ?.childImageSharp
                                                      ?.fluid as FluidObject
                                              }
                                              alt={person?.image?.alt as string}
                                              style={{
                                                  borderRadius: '3%',
                                              }}
                                          />
                                      ) : (
                                          <img
                                              src={
                                                  person?.image
                                                      ?.source as string
                                              }
                                              alt={person?.image?.alt as string}
                                              css={css`
                                                  display: block;
                                                  border-radius: 3%;
                                                  width: 160px;
                                                  margin: 0 auto 14px;
                                              `}
                                          />
                                      )}

                                      <p className='name'>{person?.name}</p>
                                      <p className='role'>{person?.role}</p>
                                  </div>
                              );
                          })
                        : ''}
                </div>
            </div>
        </div>
    </Wrapper>
);

const OneColumnPage: FC<{ data: OneColumnPageQuery }> = ({ data }) => {
    const { frontmatter } = data.markdownRemark || {};

    return (
        <Layout pageTitle={frontmatter?.pageTitle}>
            <OneColumnPageTemplate
                content={frontmatter?.content}
                openerImage={frontmatter?.openerImage}
                teamList={frontmatter?.teamList}
            />
        </Layout>
    );
};

export const oneColumnPageQuery = graphql`
    query OneColumnPage($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                pageTitle
                content
                openerImage {
                    source {
                        ...openerImageFragment
                    }
                    alt
                }
                teamList {
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

export default OneColumnPage;
