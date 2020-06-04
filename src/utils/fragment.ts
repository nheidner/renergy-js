import { graphql } from 'gatsby';

export const openerImageGallery = graphql`
    fragment openerImageGallery on File {
        childImageSharp {
            fluid(maxWidth: 1600) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;

export const teamPerson = graphql`
    fragment teamPerson on File {
        childImageSharp {
            fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;

export const openerImage = graphql`
    fragment openerImage on File {
        childImageSharp {
            fluid(maxWidth: 1100) {
                ...GatsbyImageSharpFluid
            }
        }
    }
`;

export const thumbNail = graphql`
    fragment thumbNail on File {
        childImageSharp {
            fluid(maxWidth: 750) {
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
