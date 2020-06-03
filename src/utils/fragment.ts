import { graphql } from 'gatsby';

export const openerImageFragment = graphql`
    fragment openerImageFragment on File {
        childImageSharp {
            fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;

export const personImg = graphql`
    fragment personImg on File {
        childImageSharp {
            fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;
