import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({
    html,
    markdown,
    ...props
}: {
    html?: string;
    markdown?: string;
    [props: string]: any;
}) => {
    if (html !== undefined) {
        return <div dangerouslySetInnerHTML={{ __html: html }} {...props} />;
    } else {
        return <ReactMarkdown source={markdown} {...props} />;
    }
};
