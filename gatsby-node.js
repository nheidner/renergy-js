const pathFunc = require('path');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const locales = require('./locales');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            templateKey
                        }
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) {
            result.errors.forEach((e) => console.error(e.toString()));
            return Promise.reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach((edge) => {
            if (typeof edge.node.fields.slug === 'string') {
                const { id } = edge.node;
                const path = edge.node.fields.slug;
                createPage({
                    path,
                    component: pathFunc.resolve(
                        `src/templates/${String(
                            edge.node.frontmatter.templateKey
                        )}.tsx`
                    ),
                    // additional data can be passed via context
                    context: {
                        id,
                    },
                });
            }
        });
    });
};

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    fmImagesToRelative(node); // convert image paths for gatsby images

    // create slug field of type string only for markdown files which are supposed to become pages
    if (node.internal.owner !== 'gatsby-transformer-remark') return;

    const slug = node.frontmatter.path
        ? (locales.primary === node.frontmatter.locale
              ? ''
              : `/${node.frontmatter.locale}`) + node.frontmatter.path
        : undefined;

    createNodeField({
        node,
        name: 'slug',
        value: slug,
    });
};
