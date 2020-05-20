const path = require('path');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        id
                        frontmatter {
                            lang
                            templateKey
                            path
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
            const id = edge.node.id;
            if (edge.node.frontmatter.path) {
                createPage({
                    path: edge.node.frontmatter.path,
                    component: path.resolve(
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

exports.onCreateNode = ({ node }) => {
    fmImagesToRelative(node); // convert image paths for gatsby images
};
