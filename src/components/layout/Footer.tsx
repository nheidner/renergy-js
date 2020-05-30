import React, { FC, ReactElement } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FooterQuery } from '../../../gatsby-graphql';
import { makeOptional } from '../../types/optionalTypes';

const FooterTemplate = ({ content }: { content: makeOptional<string> }) => {
    return <div>{content}</div>;
};

interface IFooterProps {
    currentLocale: string;
}

interface IFooterQuery extends FooterQuery {
    [locale: string]: FooterQuery[keyof FooterQuery];
}

// type IFooterQuery = FooterQuery & {
//     [locale: string]: FooterQuery[keyof FooterQuery];
// };

const Footer: FC<IFooterProps> = ({ currentLocale }): ReactElement => {
    const queryData = useStaticQuery<IFooterQuery>(
        graphql`
            query Footer {
                en: markdownRemark(
                    frontmatter: {
                        templateKey: { eq: "footer" }
                        locale: { eq: "en" }
                    }
                ) {
                    frontmatter {
                        title
                        content
                    }
                }
                de: markdownRemark(
                    frontmatter: {
                        templateKey: { eq: "footer" }
                        locale: { eq: "de" }
                    }
                ) {
                    frontmatter {
                        title
                        content
                    }
                }
            }
        `
    );

    return (
        <FooterTemplate
            content={queryData[currentLocale]?.frontmatter?.content}
        />
    );
};

export default Footer;
