import CMS from 'netlify-cms-app';
import React from 'react';
import { Template, OneColumnPageTemplate } from '../templates/one-column-page';
import { IndexTemplate } from '../templates/index';
import { ContactTemplate } from '../templates/contact';
import withEmotion from './with-emotion';

const OneColumnPagePreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    // console.log('openerImage: ', data.openerImage);
    // console.log('content: ', data.content);
    // console.log('teamList: ', data.teamList);
    return (
        // <div>hello world</div>
        <OneColumnPageTemplate
            openerImage={data.openerImage}
            content={data.content}
            teamList={data.teamList}
        />
    );
};

const IndexTemplatePreview = ({ entry }) => {
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

const ContactPreview = ({ entry }) => {
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

CMS.registerPreviewTemplate('our-story', withEmotion(OneColumnPagePreview));
CMS.registerPreviewTemplate('one-column', withEmotion(OneColumnPagePreview));
CMS.registerPreviewTemplate('index', withEmotion(IndexTemplatePreview));
CMS.registerPreviewTemplate('contact_us', withEmotion(ContactPreview));
