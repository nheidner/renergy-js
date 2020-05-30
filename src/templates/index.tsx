/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Link from '../components/Link';
import { IndexQuery } from '../../gatsby-graphql';
import { makeOptional } from '../types/optionalTypes';

const Heading = styled('h1')`
    font-size: 30px;
    margin-top: 0;
`;

interface IIndexTemplate {
    title: makeOptional<string>;
    content: makeOptional<string>;
}

export const IndexTemplate: FC<IIndexTemplate> = ({ title, content }) => {
    return (
        <div
            css={css`
                background-color: #ddd;
            `}>
            <Heading>{title}</Heading>
            {content}
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
        <Layout>
            <IndexTemplate
                title={frontmatter?.title}
                content={frontmatter?.content}
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
                title
                content
            }
        }
    }
`;

export default Index;
