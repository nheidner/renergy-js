/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { FC, ReactElement, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FooterQuery } from '../../../gatsby-graphql';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import returnLocalizedString from '../../utils/returnLocalizedString';
import {
    Wrapper,
    mainTemplateTextStyles,
    Button,
    mainTextStyles,
} from '../../utils/styles';

type TLocale = IFooterQuery[keyof IFooterQuery] & {
    [name: string]: IFooterQuery[keyof IFooterQuery];
};

type TFooterTemplate = TLocale['frontmatter'];

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

const returnRedAsteriks = () => (
    <span
        css={css`
            color: #cc0000;
        `}>
        {' '}
        *
    </span>
);
const Form: FC<{
    locale: string;
    description: string;
    buttonText: string;
    [props: string]: any;
}> = ({ locale, description, buttonText, ...props }) => {
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
        <form onSubmit={formik.handleSubmit} name='Contact Form' {...props}>
            <div className='description'>{description}</div>
            <div className='name'>
                <label htmlFor='name'>
                    {returnLocalizedString({ en: 'Name', de: 'Name' }, locale)}
                    {returnRedAsteriks()}
                </label>
                <input {...formik.getFieldProps('name')} />
                <div className='errorMessage'>
                    {formik.touched.name && formik.errors.name ? (
                        <span>{formik.errors.name}</span>
                    ) : null}
                </div>
            </div>

            <div className='email'>
                <label htmlFor='email'>
                    {returnLocalizedString(
                        { en: 'Email', de: 'E-Mail' },
                        locale
                    )}
                    {returnRedAsteriks()}
                </label>
                <input {...formik.getFieldProps('email')} />
                <div className='errorMessage'>
                    {formik.touched.email && formik.errors.email ? (
                        <span>{formik.errors.email}</span>
                    ) : null}
                </div>
            </div>

            <div className='subject'>
                <label htmlFor='subject'>
                    {returnLocalizedString(
                        { en: 'Subject', de: 'Betreff' },
                        locale
                    )}
                    {returnRedAsteriks()}
                </label>
                <input {...formik.getFieldProps('subject')} />
                <div className='errorMessage'>
                    {formik.touched.subject && formik.errors.subject ? (
                        <span>{formik.errors.subject}</span>
                    ) : null}
                </div>
            </div>

            <div className='message'>
                <label htmlFor='message'>
                    {returnLocalizedString(
                        { en: 'Message', de: 'Nachricht' },
                        locale
                    )}
                    {returnRedAsteriks()}
                </label>
                <textarea {...formik.getFieldProps('message')} />
                <div className='errorMessage'>
                    {formik.touched.message && formik.errors.message ? (
                        <span>{formik.errors.message}</span>
                    ) : null}
                </div>
            </div>

            <SubmitButton type='submit'>{buttonText}</SubmitButton>
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

export const FooterTemplate: FC<
    TFooterTemplate & { currentLocale: string }
> = ({ currentLocale, form }) => {
    return (
        <div
            css={css`
                width: 100%;
                background-color: #151515;
            `}>
            <Wrapper
                css={css`
                    ${mainTextStyles}
                    ${mainTemplateTextStyles}
                    background-color: #151515;
                    margin: 0 auto;
                `}>
                <Form
                    locale={currentLocale as string}
                    description={form?.description as string}
                    buttonText={form?.button as string}
                    css={css`
                        > div {
                            width: 100%;
                            margin-bottom: 12px;
                        }

                        div.description {
                            font-size: 13px;
                        }
                        div.name {
                        }
                        div.email {
                        }
                        div.subject {
                        }
                        div.message textarea {
                            height: 80px;
                        }
                        > div label {
                            padding-bottom: 6px;
                        }
                        > div > input,
                        textarea {
                            width: calc(100% - 30px);
                            display: block;
                            padding: 11px 15px;
                            font-size: 14px;
                            line-height: 1.72;
                            color: #bbbbbb;
                            background-color: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.01);
                        }
                        > div div.errorMessage {
                            color: #a4a4a4;
                            height: 23px;
                        }
                    `}
                />
            </Wrapper>
        </div>
    );
};

interface IFooterProps {
    currentLocale: string;
}

interface IFooterQuery extends FooterQuery {
    [locale: string]: FooterQuery[keyof FooterQuery];
}

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
                        form {
                            topic
                            heading
                            description
                            button
                        }
                    }
                }
                de: markdownRemark(
                    frontmatter: {
                        templateKey: { eq: "footer" }
                        locale: { eq: "de" }
                    }
                ) {
                    frontmatter {
                        form {
                            topic
                            heading
                            description
                            button
                        }
                    }
                }
            }
        `
    );

    return (
        <FooterTemplate
            form={queryData[currentLocale]?.frontmatter?.form}
            currentLocale={currentLocale}
        />
    );
};

export default Footer;
