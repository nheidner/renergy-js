/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

interface IIndexTemplate {
    title: string;
}

const Heading = styled('h1')`
    font-size: 30px;
    margin-top: 0;
`;

export const IndexTemplate: FC<IIndexTemplate> = ({ title }) => (
    <div
        css={css`
            background-color: #ddd;
        `}>
        <Heading>{title}</Heading>
        Hello world
    </div>
);

interface IQueryResult {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string;
            };
        };
    };
}

const Index: FC<IQueryResult> = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <IndexTemplate title={frontmatter.title} />
        </Layout>
    );
};

export const pageQuery = graphql`
    query {
        markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
            frontmatter {
                title
            }
        }
    }
`;

export default Index;
