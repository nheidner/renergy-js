/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { BlueprintQuery } from '../../gatsby-graphql';

type TMarkdownRemark = BlueprintQuery[keyof BlueprintQuery] & {
    [name: string]: BlueprintQuery[keyof BlueprintQuery];
};

type TIndexTemplate = TMarkdownRemark['frontmatter'];

export const IndexTemplate: FC<TIndexTemplate> = ({ locale }) => (
    <div>Hello world {locale}</div>
);

const Index: FC<{ data: BlueprintQuery }> = ({ data }) => {
    const { frontmatter } = data.markdownRemark || {};

    return (
        <Layout>
            <IndexTemplate locale={frontmatter?.locale} />
        </Layout>
    );
};

export const bluePrint = graphql`
    query Blueprint($locale: String) {
        markdownRemark(
            frontmatter: {
                templateKey: { eq: "blueprint" }
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
