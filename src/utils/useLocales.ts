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

const useLocales = (): ILocalesSettings => {
    const { site } = useStaticQuery<TData>(
        graphql`
            query Locales {
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

export default useLocales;
