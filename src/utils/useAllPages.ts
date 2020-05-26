import { useCallback } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export interface IPageItem {
    node: {
        fields: {
            slug: string;
        };
        frontmatter: {
            locale: string;
        };
    };
}

interface TDataQuery {
    allMarkdownRemark: {
        edges: IPageItem[];
    };
}

const useAllPages = (): IPageItem[] => {
    const query = useCallback(
        () =>
            useStaticQuery<TDataQuery>(
                graphql`
                    query {
                        allMarkdownRemark(
                            filter: {
                                frontmatter: { templateKey: { regex: "" } }
                            }
                        ) {
                            edges {
                                node {
                                    fields {
                                        slug
                                    }
                                    frontmatter {
                                        locale
                                    }
                                }
                            }
                        }
                    }
                `
            ),
        []
    );

    return query().allMarkdownRemark.edges;
};

export default useAllPages;
