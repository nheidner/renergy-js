import { graphql, useStaticQuery } from 'gatsby';

interface TData {
    site: {
        siteMetadata: {
            title: string;
            description: string;
        };
    };
}

const useSiteMetadata = () => {
    const { site } = useStaticQuery<TData>(
        graphql`
            query SITE_METADATA_QUERY {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `
    );
    return site.siteMetadata;
};

export default useSiteMetadata;
