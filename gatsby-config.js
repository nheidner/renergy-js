const locales = require('./locales');

module.exports = {
    siteMetadata: {
        title: 'Renergy',
        description: 'Renergy description',
        localesSettings: locales,
        menu: [
            {
                item: {
                    en: 'Home',
                    de: 'Start',
                },
                to: '/',
            },
            {
                item: {
                    en: 'Our Story',
                    de: 'Über Uns',
                },
                to: '/our-story',
            },
            {
                item: {
                    en: 'Waste To Energy',
                    de: 'Energie aus Abfall',
                },
                to: '/waste-to-energy',
                children: [
                    {
                        item: {
                            en: 'Concept',
                            de: 'Konzept',
                        },
                        to: '/waste-to-energy/concept',
                    },
                    {
                        item: {
                            en: 'Technology',
                            de: 'Technologie',
                        },
                        to: '/waste-to-energy/technology',
                    },
                    {
                        item: {
                            en: 'Configuration',
                            de: 'Konfiguration',
                        },
                        to: '/waste-to-energy/configuration',
                    },
                    {
                        item: {
                            en: 'Input / Output',
                            de: 'Input / Output',
                        },
                        to: '/waste-to-energy/input-output',
                    },
                ],
            },
            {
                item: {
                    en: 'Tyre Recycling',
                    de: 'Reifen Recycling',
                },
                to: '/tire-recycling',
                children: [
                    {
                        item: {
                            en: 'Concept',
                            de: 'Konzept',
                        },
                        to: '/tire-recycling/concept',
                    },
                    {
                        item: {
                            en: 'Technology',
                            de: 'Technologie',
                        },
                        to: '/tire-recycling/technology',
                    },
                    {
                        item: {
                            en: 'Configuration',
                            de: 'Anlagenaufbau',
                        },
                        to: '/tire-recycling/configuration',
                    },
                    {
                        item: {
                            en: 'Input / Output',
                            de: 'Input / Output',
                        },
                        to: '/tire-recycling/input-output',
                    },
                ],
            },
            {
                item: {
                    en: 'Contact Us',
                    de: 'Kontakt',
                },
                to: '#contact',
            },
        ],
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-plugin-graphql-codegen`,
            options: {
                fileName: `./gatsby-graphql.ts`,
            },
        },
        {
            // keep as first gatsby-source-filesystem plugin for gatsby image support
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/img`,
                name: 'uploads',
            },
        },
        {
            // keep as first gatsby-source-filesystem plugin for gatsby image support
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/assets`,
                name: 'assets',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/markdown`,
                name: 'pages',
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-relative-images',
                        options: {
                            name: 'uploads',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 2048,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            destinationDir: 'static',
                        },
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
                enableIdentityWidget: `true`,
                publicPath: `admin`,
                htmlTitle: `Editor`,
            },
        },
        'gatsby-plugin-netlify', // make sure to keep it last in the array
    ],
};
