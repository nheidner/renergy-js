/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { FC, ReactElement, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FooterQuery } from '../../../gatsby-graphql';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import returnLocalizedString from '../../utils/returnLocalizedString';
import theme from '../../utils/theme';
import Link from '../Link';
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

interface ILabels {
    subject_label: string;
    name_label: string;
    message_label: string;
    email_label: string;
}

const Form: FC<{
    locale: string;
    description: string;
    buttonText: string;
    labels: ILabels;
    [props: string]: any;
}> = ({ locale, description, buttonText, labels, ...props }) => {
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
            <div className='nameEmail'>
                <div className='name'>
                    <label htmlFor='name'>
                        {labels.name_label}
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
                        {labels.email_label}
                        {returnRedAsteriks()}
                    </label>
                    <input {...formik.getFieldProps('email')} />
                    <div className='errorMessage'>
                        {formik.touched.email && formik.errors.email ? (
                            <span>{formik.errors.email}</span>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className='subject'>
                <label htmlFor='subject'>
                    {labels.subject_label}
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
                    {labels.message_label}
                    {returnRedAsteriks()}
                </label>
                <textarea {...formik.getFieldProps('message')} />
                <div className='errorMessage'>
                    {formik.touched.message && formik.errors.message ? (
                        <span>{formik.errors.message}</span>
                    ) : null}
                </div>
            </div>

            <div className='submitButton'>
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
            </div>
        </form>
    );
};

const FlexItem = styled.div``;

export const FooterTemplate: FC<
    { currentLocale: string } & TFooterTemplate
> = ({
    currentLocale,
    form,
    office_germany,
    office_uae,
    get_in_touch,
    links,
    heading,
}) => {
    return (
        <footer
            id='contact'
            css={css`
                width: 100%;
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                background-color: #151515;
            `}>
            <Wrapper
                css={css`
                    ${mainTextStyles}
                    ${mainTemplateTextStyles}
                    margin: 0 auto;
                    padding: 50px 0 50px;
                    max-width: 900px;

                    background-color: #151515;
                    margin: 0 auto;
                `}>
                <h1
                    css={css`
                        color: #bbb;
                        font-size: 40px;
                        margin-top: 0;
                    `}>
                    {heading}
                </h1>
                <div
                    css={css`
                        @media (min-width: ${theme.breakpoints[0]}px) {
                            display: flex;
                            flex-wrap: nowrap;
                            justify-content: space-between;
                        }
                    `}>
                    <FlexItem
                        css={css`
                            @media (min-width: ${theme.breakpoints[0]}px) {
                                width: 60%;
                            }
                        `}>
                        <Form
                            locale={currentLocale as string}
                            description={form?.description as string}
                            buttonText={form?.button as string}
                            labels={form?.labels as ILabels}
                            css={css`
                                div {
                                    width: 100%;
                                    margin-bottom: 10px;
                                }

                                div.description {
                                    font-size: 13px;
                                }
                                div.nameEmail {
                                    display: flex;
                                    flex-wrap: nowrap;
                                    justify-content: space-between;
                                    margin-bottom: 0;
                                }
                                div.nameEmail > div {
                                    width: 45%;
                                }
                                div.name {
                                }
                                div.email {
                                }
                                div.subject {
                                }
                                @media (min-width: ${theme.breakpoints[0]}px) {
                                    div.submitButton {
                                        text-align: right;
                                    }
                                }

                                div.message textarea {
                                    height: 80px;
                                }
                                > div label {
                                    padding-bottom: 6px;
                                }
                                div > input,
                                textarea {
                                    width: calc(100% - 30px);
                                    font-family: Arial, Helvetica, sans-serif;
                                    display: block;
                                    padding: 9px 12px;
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
                    </FlexItem>
                    <FlexItem
                        css={css`
                            position: relative;
                            margin-top: 50px;
                            @media (min-width: ${theme.breakpoints[0]}px) {
                                margin-top: 0;
                                padding-left: 50px;
                            }
                            section {
                                margin-bottom: 48px;
                            }
                            section h5 {
                                color: #888888;
                                font-size: 11px;
                                font-family: 'IBM Plex Sans Condensed',
                                    sans-serif;
                                font-weight: 400;
                                text-transform: uppercase;
                                margin: 0 0 6px;
                            }
                            section p {
                                margin: 0 0 2px;
                            }
                            section a {
                                border-bottom: 1px dotted #ffc400;
                                color: #bbb;
                                text-decoration: none;
                            }
                        `}>
                        <section>
                            <h5>{office_germany?.heading}</h5>
                            {office_germany?.address?.map(
                                (addressLine, index) => {
                                    return (
                                        <p key={index}>{addressLine?.line}</p>
                                    );
                                }
                            )}
                        </section>
                        <section>
                            <h5>{get_in_touch?.heading}</h5>
                            <p>
                                <Link to={get_in_touch?.email?.href as string}>
                                    {get_in_touch?.email?.text}
                                </Link>
                            </p>
                        </section>
                        <section>
                            <h5>{office_uae?.heading}</h5>
                            {office_uae?.address?.map((addressLine, index) => {
                                return <p key={index}>{addressLine?.line}</p>;
                            })}
                        </section>
                        <div
                            css={css`
                                min-width: 300px;
                                @media (min-width: ${theme.breakpoints[0]}px) {
                                    position: absolute;
                                    right: 0;
                                    bottom: 0;
                                }
                            `}>
                            <ul
                                css={css`
                                    list-style: none;
                                    li {
                                        float: right;
                                        margin-left: 25px;
                                        position: relative;
                                    }
                                    li::before {
                                        content: '·';
                                        color: #fff;
                                        font-weight: bold;
                                        position: absolute;
                                        left: -14px;
                                        top: 0;
                                    }
                                    li:last-of-type::before {
                                        content: '';
                                        color: #fff;
                                        font-weight: bold;
                                        position: absolute;
                                        left: -15px;
                                        top: 0;
                                    }
                                    a {
                                        text-decoration: none;
                                        border-bottom: none;
                                        text-transform: uppercase;
                                        transition: color, 200ms;
                                    }

                                    a:hover {
                                        color: #888;
                                    }
                                `}>
                                {links?.map((linkItem, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={linkItem?.href as string}>
                                                {linkItem?.text}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </FlexItem>
                </div>
            </Wrapper>
        </footer>
    );
};

interface IFooterQuery extends FooterQuery {
    [locale: string]: FooterQuery[keyof FooterQuery];
}

const Footer: FC<{
    currentLocale: string;
}> = ({ currentLocale }): ReactElement => {
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
                        heading
                        form {
                            description
                            labels {
                                name_label
                                email_label
                                subject_label
                                message_label
                            }
                            button
                        }
                        office_germany {
                            heading
                            address {
                                line
                            }
                        }
                        get_in_touch {
                            heading
                            telephone
                            email {
                                text
                                href
                            }
                        }
                        office_uae {
                            heading
                            address {
                                line
                            }
                        }
                        links {
                            text
                            href
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
                        heading
                        form {
                            description
                            labels {
                                name_label
                                email_label
                                subject_label
                                message_label
                            }
                            button
                        }
                        office_germany {
                            heading
                            address {
                                line
                            }
                        }
                        get_in_touch {
                            heading
                            telephone
                            email {
                                text
                                href
                            }
                        }
                        office_uae {
                            heading
                            address {
                                line
                            }
                        }
                        links {
                            text
                            href
                        }
                    }
                }
            }
        `
    );

    return (
        <FooterTemplate
            form={queryData[currentLocale]?.frontmatter?.form}
            office_germany={
                queryData[currentLocale]?.frontmatter?.office_germany
            }
            get_in_touch={queryData[currentLocale]?.frontmatter?.get_in_touch}
            office_uae={queryData[currentLocale]?.frontmatter?.office_uae}
            links={queryData[currentLocale]?.frontmatter?.links}
            currentLocale={currentLocale}
            heading={queryData[currentLocale]?.frontmatter?.heading}
        />
    );
};

export default Footer;
