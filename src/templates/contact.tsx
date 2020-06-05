/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { ContactQuery } from '../../gatsby-graphql';
import { Formik, useFormik, FormikValues, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { Button } from '../utils/styles';
import returnLocalizedString from '../utils/returnLocalizedString';

type TMarkdownRemark = ContactQuery[keyof ContactQuery] & {
    [name: string]: ContactQuery[keyof ContactQuery];
};

type TIndexTemplate = TMarkdownRemark['frontmatter'];

const SubmitButton = Button.withComponent('button');

const Form: FC<{ locale: string }> = ({ locale }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(
                    80,
                    returnLocalizedString(
                        {
                            en: 'Must be 80 characters or less',
                            de: 'Kann max. 80 Zeichen enthalten',
                        },
                        locale
                    )
                )
                .required(
                    returnLocalizedString(
                        {
                            en: 'Required',
                            de: 'Benötigt',
                        },
                        locale
                    )
                ),

            email: Yup.string()
                .email(
                    returnLocalizedString(
                        {
                            en: 'Invalid email address',
                            de: 'Ungültige Email Addresse',
                        },
                        locale
                    )
                )
                .required(
                    returnLocalizedString(
                        {
                            en: 'Required',
                            de: 'Benötigt',
                        },
                        locale
                    )
                ),
            subject: Yup.string()
                .max(
                    40,
                    returnLocalizedString(
                        {
                            en: 'Must be 40 characters or less',
                            de: 'Kann max. 40 Zeichen enthalten',
                        },
                        locale
                    )
                )
                .required(
                    returnLocalizedString(
                        {
                            en: 'Required',
                            de: 'Benötigt',
                        },
                        locale
                    )
                ),
            message: Yup.string()
                .max(
                    300,
                    returnLocalizedString(
                        {
                            en: 'Must be 300 characters or less',
                            de: 'Kann max. 300 Zeichen enthalten',
                        },
                        locale
                    )
                )
                .required(
                    returnLocalizedString(
                        {
                            en: 'Required',
                            de: 'Benötigt',
                        },
                        locale
                    )
                ),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        // @ts-ignore
        <form onSubmit={formik.handleSubmit} data-netlify='true'>
            <div className='name'>
                <label htmlFor='name'>
                    {returnLocalizedString({ en: 'Name', de: 'Name' }, locale)}
                </label>
                <input name='name' {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                ) : null}
            </div>

            <div className='email'>
                <label htmlFor='email'>
                    {returnLocalizedString(
                        { en: 'Email', de: 'E-Mail' },
                        locale
                    )}
                </label>
                <input name='email' {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
            </div>

            <div className='subject'>
                <label htmlFor='subject'>
                    {returnLocalizedString(
                        { en: 'Subject', de: 'Betreff' },
                        locale
                    )}
                </label>
                <input name='subject' {...formik.getFieldProps('subject')} />
                {formik.touched.subject && formik.errors.subject ? (
                    <div>{formik.errors.subject}</div>
                ) : null}
            </div>

            <div className='message'>
                <label htmlFor='message'>
                    {returnLocalizedString(
                        { en: 'Message', de: 'Nachricht' },
                        locale
                    )}
                </label>
                <textarea name='message' {...formik.getFieldProps('message')} />
                {formik.touched.message && formik.errors.message ? (
                    <div>{formik.errors.message}</div>
                ) : null}
            </div>

            <SubmitButton type='submit'>
                {returnLocalizedString({ en: 'Submit', de: 'Senden' }, locale)}
            </SubmitButton>
        </form>
    );
};

export const IndexTemplate: FC<TIndexTemplate> = ({ locale }) => (
    <div>
        <Form locale={locale as string} />
    </div>
);

const Index: FC<{ data: ContactQuery }> = ({ data }) => {
    const { frontmatter } = data.markdownRemark || {};

    return (
        <Layout>
            <IndexTemplate locale={frontmatter?.locale} />
        </Layout>
    );
};

export const contact = graphql`
    query Contact($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                locale
            }
        }
    }
`;

export default Index;
