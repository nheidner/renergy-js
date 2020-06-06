import CMS from 'netlify-cms-app';
import React from 'react';
import { Template, OneColumnPageTemplate } from '../templates/one-column-page';
import { IndexTemplate } from '../templates/index';
import { ContactTemplate } from '../templates/contact';
import withEmotion from './with-emotion';

const OneColumnPagePreviewEn = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    return (
        <OneColumnPageTemplate
            openerImage={data.openerImage}
            content={data.content}
            teamList={data.teamList}
        />
    );
};

const IndexTemplatePreviewEn = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    console.log(data);
    return (
        <IndexTemplate
            openers={data.openers}
            introducing={data.introducing}
            clients={data.clients}
            contact={data.contact}
        />
    );
};

const ContactPreviewEn = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    console.log(data);
    return (
        // <ContactTemplate
        //     locale={data.locale}
        //     heading={data.heading}
        //     form={data.form}
        //     contact={data.contact}
        // />
        <div></div>
    );
};

CMS.registerPreviewTemplate('our-story', withEmotion(OneColumnPagePreviewEn));
CMS.registerPreviewTemplate('one-column', withEmotion(OneColumnPagePreviewEn));
CMS.registerPreviewTemplate('index', withEmotion(IndexTemplatePreviewEn));
CMS.registerPreviewTemplate('contact_us', withEmotion(ContactPreviewEn));

const OneColumnPagePreviewDe = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    return (
        <OneColumnPageTemplate
            openerImage={data.openerImage}
            content={data.content}
            teamList={data.teamList}
        />
    );
};

const IndexTemplatePreviewDe = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    console.log(data);
    return (
        <IndexTemplate
            openers={data.openers}
            introducing={data.introducing}
            clients={data.clients}
            contact={data.contact}
        />
    );
};

const ContactPreviewDe = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    console.log(data);
    return (
        // <ContactTemplate
        //     locale={data.locale}
        //     heading={data.heading}
        //     form={data.form}
        //     contact={data.contact}
        // />
        <div></div>
    );
};

CMS.registerPreviewTemplate(
    'our-story-de',
    withEmotion(OneColumnPagePreviewDe)
);
CMS.registerPreviewTemplate(
    'one-column-de',
    withEmotion(OneColumnPagePreviewDe)
);
CMS.registerPreviewTemplate('pages-de', withEmotion(IndexTemplatePreviewDe));
CMS.registerPreviewTemplate('contact_us-de', withEmotion(ContactPreviewDe));
