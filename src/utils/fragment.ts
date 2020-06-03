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

export const thumbNail = graphql`
    fragment thumbNail on File {
        childImageSharp {
            fluid(maxWidth: 1100) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;

export const client = graphql`
    fragment client on File {
        childImageSharp {
            fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;
