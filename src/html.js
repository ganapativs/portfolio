import PropTypes from 'prop-types';
import React from 'react';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <noscript>
          <style>
            {`
            body {
              --color-accent: #00A0FF;
            }
            `}
          </style>
        </noscript>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This site works best with JavaScript enabled{' '}
          <span role="img" aria-label="Please!">
            🙏
          </span>
        </noscript>
        <div
          key={'body'}
          id="___gatsby"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: In production, raw HTML is shown otherwise
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
