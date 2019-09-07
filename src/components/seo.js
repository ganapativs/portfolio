import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  return (
    <Helmet
      title={site.siteMetadata.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      htmlAttributes={{
        lang: 'en',
      }}>
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self' https://www.google.com/analytics https://marketingplatform.google.com/about/analytics https://twitter.com https://github.com https://stackoverflow.com https://www.linkedin.com https://dribbble.com https://www.instagram.com https://www.facebook.com https://www.google-analytics.com ; base-uri 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; block-all-mixed-content; connect-src 'self' ws: ; img-src 'self' https://www.google-analytics.com; manifest-src 'self'; font-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com;"
      />
      <meta name="description" content={site.siteMetadata.description} />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta
        name="google-site-verification"
        content="SjjIT31sWEJ5ZN2ADsgkGuVZCCJSS0KyvBODf6g0Ijw"
      />
      <meta name="subject" content={site.siteMetadata.title} />
      <meta
        name="keywords"
        content="HTML5,CSS3,JavaScript,React,UI,UX,CSS-in-JS,Animation,Frontend Developer,Webpack,Node.js,GraphQL,Performance,60fps,Full-Stack Developer in Bangalore,Full-Stack Developer in Bengaluru"
      />
      <link rel="author" href="/humans.txt" />
      <link rel="me" href="https://twitter.com/ganapativs" type="text/html" />
      <link rel="me" href="https://github.com/ganapativs" type="text/html" />
      <link
        rel="me"
        href="https://stackoverflow.com/users/2627022"
        type="text/html"
      />
      <link
        rel="me"
        href="https://www.linkedin.com/in/ganapativs/"
        type="text/html"
      />
      <link rel="me" href="https://dribbble.com/ganapativs" type="text/html" />
      <link
        rel="me"
        href="https://www.instagram.com/ganapativs"
        type="text/html"
      />
      <link
        rel="me"
        href="https://www.facebook.com/Ganapati.V.S"
        type="text/html"
      />
      <meta property="og:url" content="https://meetguns.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={site.siteMetadata.title} />
      <meta
        property="og:image"
        content="https://meetguns.com/images/fb-banner.png"
      />
      <meta property="og:description" content={site.siteMetadata.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.siteMetadata.author} />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:url" content="https://meetguns.com" />
      <meta name="twitter:title" content={site.siteMetadata.title} />
      <meta
        name="twitter:description"
        content={site.siteMetadata.description}
      />
      <meta
        name="twitter:image"
        content="https://meetguns.com/images/twitter-banner.png"
      />
    </Helmet>
  );
}

export default SEO;
