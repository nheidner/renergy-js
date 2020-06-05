import CMS from 'netlify-cms-app';
import React from 'react';
import { OneColumnPageTemplate } from '../templates/one-column-page';
import withEmotion from './with-emotion';
// import MarkdownIt from 'markdown-it';

const OneColumnPagePreview = ({ entry }) => {
    const data = entry.getIn(['data']).toJS();
    console.log(data);
    console.log(data.openerImage);
    // const md = new MarkdownIt();
    // const text = md.render(data.body);
    return (
        <div>hello world</div>
        // <OneColumnPageTemplate
        //     openerImage={data.openerImage}
        //     content={data.content}
        // />
    );
};

CMS.registerPreviewTemplate('our-story', withEmotion(OneColumnPagePreview));
