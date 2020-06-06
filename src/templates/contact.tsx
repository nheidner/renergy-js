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
import { Wrapper } from '../utils/styles';
import SectionHeading from '../components/SectionHeading';
import { personImg } from '../utils/fragment';
import Img, { FluidObject } from 'gatsby-image';
import theme from '../utils/theme';

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
        <form onSubmit={formik.handleSubmit} name='Contact Form' {...props}>
            <div className='description'>{description}</div>
            <div className='name'>
                <label htmlFor='name'>
                    {returnLocalizedString({ en: 'Name', de: 'Name' }, locale)}
                    {returnRedAsteriks()}
                </label>
                <input name='name' {...formik.getFieldProps('name')} />
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
                <input name='email' {...formik.getFieldProps('email')} />
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
                <input name='subject' {...formik.getFieldProps('subject')} />
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
                <textarea name='message' {...formik.getFieldProps('message')} />
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

export const IndexTemplate: FC<TIndexTemplate> = ({
    locale,
    heading,
    form,
    contact,
}) => (
    <Wrapper>
        <h1
            css={css`
                margin: 50px 0 50px;
            `}>
            {heading}
        </h1>
        <div
            css={css`
                > section {
                    margin-bottom: 50px;
                }
                @media (min-width: ${theme.breakpoints[0]}px) {
                    display: flex;
                    justify-content: space-between;
                    > section {
                        width: 43%;
                    }
                }
            `}>
            <section className='form'>
                <SectionHeading backImg={false}>{form?.topic}</SectionHeading>
                <h2
                    css={css`
                        font-size: 24px;
                        margin-bottom: ${theme.margins.margin1};
                    `}>
                    {form?.heading}
                </h2>
                <Form
                    locale={locale as string}
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

                            /* height: 48px; */
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
            </section>
            <section
                className='contact'
                css={css`
                    h5 {
                        color: #888888;
                        font-size: 11px;
                        font-family: 'IBM Plex Sans Condensed', sans-serif;
                        font-weight: 400;
                        text-transform: uppercase;
                        margin-bottom: 6px;
                    }
                    p {
                        width: 100%;
                        margin: 0 0 5px;
                    }
                    section {
                        margin-bottom: 25px;
                    }
                    .image-wrapper {
                        border-radius: 50%;
                        border: 24px solid #ffffff;
                        overflow: hidden;
                        position: relative;
                        margin: 0 auto 24px;
                        height: 230px;
                        width: 230px;
                        box-sizing: border-box;
                        margin-bottom: ${theme.margins.margin1};
                    }
                `}>
                {contact?.image?.source?.childImageSharp ? (
                    <div className='image-wrapper'>
                        <Img
                            fluid={
                                contact?.image?.source?.childImageSharp
                                    ?.fluid as FluidObject
                            }
                            alt={contact?.image?.alt as string}
                        />
                    </div>
                ) : (
                    <div className='image-wrapper'>
                        <img
                            src={contact?.image?.source as string}
                            alt={contact?.image?.alt as string}
                            css={css``}
                        />
                    </div>
                )}

                <SectionHeading backImg={false}>{form?.topic}</SectionHeading>
                <h2>{contact?.heading}</h2>
                <div>
                    <section>{contact?.role}</section>

                    <section>
                        <h5>{contact?.address?.heading}</h5>
                        {contact?.address?.address?.map(
                            (addressLine, index) => {
                                return <p key={index}>{addressLine?.line}</p>;
                            }
                        )}
                    </section>
                    <section>
                        <h5>{contact?.telephone?.heading}</h5>
                        <p>{contact?.telephone?.line}</p>
                    </section>
                </div>
            </section>
        </div>
    </Wrapper>
);

const Index: FC<{ data: ContactQuery }> = ({ data }) => {
    const { frontmatter } = data.markdownRemark || {};
    console.log(data);
    return (
        <Layout pageTitle={frontmatter?.pageTitle}>
            <IndexTemplate
                locale={frontmatter?.locale}
                heading={frontmatter?.heading}
                form={frontmatter?.form}
                contact={frontmatter?.contact}
            />
        </Layout>
    );
};

export const contact = graphql`
    query Contact($id: String!) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                pageTitle
                locale
                heading
                form {
                    topic
                    heading
                    description
                    button
                }
                contact {
                    topic
                    heading
                    image {
                        source {
                            ...personImg
                        }
                        alt
                    }
                    role
                    address {
                        heading
                        address {
                            line
                        }
                    }
                    telephone {
                        heading
                        line
                    }
                }
            }
        }
    }
`;

export default Index;
