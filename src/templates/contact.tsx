/** @jsx jsx */
import { FC, useState } from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { ContactQuery } from '../../gatsby-graphql';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../utils/styles';
import returnLocalizedString from '../utils/returnLocalizedString';

type TMarkdownRemark = ContactQuery[keyof ContactQuery] & {
    [name: string]: ContactQuery[keyof ContactQuery];
};

type TIndexTemplate = TMarkdownRemark['frontmatter'];

const SubmitButton = Button.withComponent('button');

const encode = (data: {
    'form-name': string;
    name: string;
    email: string;
    subject: string;
    message: string;
    [props: string]: string;
}) => {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
};

const Form: FC<{ locale: string }> = ({ locale }) => {
    const [submitted, setSubmitted] = useState(false);

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
                            de: 'Kann max. nur 80 Zeichen enthalten',
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
                            de: 'Kann max. nur 40 Zeichen enthalten',
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
                            de: 'Kann max. nur 300 Zeichen enthalten',
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
            console.log(encode({ 'form-name': 'Contact Form', ...values }));
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: encode({ 'form-name': 'contact', ...values }),
            })
                .then(() => setSubmitted(true))
                .then(() => formik.resetForm())
                .catch((error) => alert(error));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} name='Contact Form'>
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
            {submitted ? (
                <div>
                    {returnLocalizedString(
                        {
                            en: 'Your message was sent',
                            de: 'Deine Nachricht wurde gesendet',
                        },
                        locale
                    )}
                </div>
            ) : null}
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
