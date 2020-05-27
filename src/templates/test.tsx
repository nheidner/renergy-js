/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Link from '../components/Link';

const Heading = styled('h1')`
    font-size: 30px;
    margin-top: 0;
`;

interface IIndexTemplate {
    title: string;
}

export const IndexTemplate: FC<IIndexTemplate> = ({ title }) => (
    <div
        css={css`
            background-color: #ddd;
        `}>
        <Heading>{title}</Heading>
        <Link
            to='/'
            css={css`
                background-color: #aaa;
            `}>
            Hello
        </Link>
        Hello world
    </div>
);

const Index: FC<IQuery> = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <IndexTemplate title={frontmatter.title} />
        </Layout>
    );
};

interface IQuery {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string;
            };
        };
    };
}

export const pageQuery = graphql`
    query Test {
        markdownRemark(frontmatter: { templateKey: { eq: "index" } }) {
            frontmatter {
                title
            }
        }
    }
`;

export default Index;
