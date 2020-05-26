import { graphql, useStaticQuery } from 'gatsby';

export interface ILocalesSettings {
    locales: string[];
    primary: string;
}

interface TData {
    site: {
        siteMetadata: {
            localesSettings: ILocalesSettings;
        };
    };
}

const getLocales = (): ILocalesSettings => {
    const { site } = useStaticQuery<TData>(
        graphql`
            query {
                site {
                    siteMetadata {
                        localesSettings {
                            locales
                            primary
                        }
                    }
                }
            }
        `
    );
    return site.siteMetadata.localesSettings;
};

export default getLocales;
