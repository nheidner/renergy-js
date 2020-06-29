import CMS from 'netlify-cms-app';
import React from 'react';
import { OneColumnPageTemplate } from '../templates/one-column-page';
import { IndexTemplate } from '../templates/index';
import { FooterTemplate } from '../components/layout/Footer';
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
    return (
        <IndexTemplate
            openers={data.openers}
            introducing={data.introducing}
            clients={data.clients}
        />
    );
};

const FooterPreviewEn = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    return (
        <FooterTemplate
            currentLocale={data.locale}
            form={data.form}
            office_germany={data.office_germany}
            get_in_touch={data.get_in_touch}
            office_uae={data.office_uae}
            links={data.links}
            heading={data.heading}
        />
    );
};

CMS.registerPreviewTemplate(
    'our-story-en',
    withEmotion(OneColumnPagePreviewEn)
);
CMS.registerPreviewTemplate(
    'one-column-en',
    withEmotion(OneColumnPagePreviewEn)
);
CMS.registerPreviewTemplate('index-en', withEmotion(IndexTemplatePreviewEn));
CMS.registerPreviewTemplate('footer_en', withEmotion(FooterPreviewEn));

// German
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
    return (
        <IndexTemplate
            openers={data.openers}
            introducing={data.introducing}
            clients={data.clients}
        />
    );
};

const FooterPreviewDe = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    return (
        <FooterTemplate
            currentLocale={data.locale}
            form={data.form}
            office_germany={data.office_germany}
            get_in_touch={data.get_in_touch}
            office_uae={data.office_uae}
            links={data.links}
            heading={data.heading}
        />
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
CMS.registerPreviewTemplate('index_de', withEmotion(IndexTemplatePreviewDe));
CMS.registerPreviewTemplate('footer_de', withEmotion(FooterPreviewDe));

// French
const OneColumnPagePreviewFr = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    return (
        <OneColumnPageTemplate
            openerImage={data.openerImage}
            content={data.content}
            teamList={data.teamList}
        />
    );
};

const IndexTemplatePreviewFr = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    return (
        <IndexTemplate
            openers={data.openers}
            introducing={data.introducing}
            clients={data.clients}
        />
    );
};

const FooterPreviewFr = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    return (
        <FooterTemplate
            currentLocale={data.locale}
            form={data.form}
            office_germany={data.office_germany}
            get_in_touch={data.get_in_touch}
            office_uae={data.office_uae}
            links={data.links}
            heading={data.heading}
        />
    );
};

CMS.registerPreviewTemplate(
    'our-story-fr',
    withEmotion(OneColumnPagePreviewFr)
);
CMS.registerPreviewTemplate(
    'one-column-fr',
    withEmotion(OneColumnPagePreviewFr)
);
CMS.registerPreviewTemplate('index_fr', withEmotion(IndexTemplatePreviewFr));
CMS.registerPreviewTemplate('footer_fr', withEmotion(FooterPreviewFr));
