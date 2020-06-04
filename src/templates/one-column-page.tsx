/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { OneColumnPageQuery } from '../../gatsby-graphql';

type TMarkdownRemark = OneColumnPageQuery[keyof OneColumnPageQuery] & {
    [name: string]: OneColumnPageQuery[keyof OneColumnPageQuery];
};

type TIndexTemplate = TMarkdownRemark['frontmatter'];

export const IndexTemplate: FC<TIndexTemplate> = ({ locale }) => (
    <div>Hello world {locale}</div>
);

const Index: FC<{ data: OneColumnPageQuery }> = ({ data }) => {
    const { frontmatter } = data.markdownRemark || {};

    return (
        <Layout>
            <IndexTemplate locale={frontmatter?.locale} />
        </Layout>
    );
};

export const oneColumnPageQuery = graphql`
    query OneColumnPage($locale: String) {
        markdownRemark(
            frontmatter: {
                templateKey: { eq: "page" }
                locale: { eq: $locale }
            }
        ) {
            frontmatter {
                locale
            }
        }
    }
`;

export default Index;
