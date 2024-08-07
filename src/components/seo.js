import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

function SEO({
  title = '',
  description = '',
  keywords = '',
  fbBanner = '',
  twitterBanner = '',
}) {
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
      title={title}
      titleTemplate={'%s'}
      htmlAttributes={{
        lang: 'en',
      }}
    >
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {/* Hard to manage right now */}
      {/* <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self' blob https://www.google.com/analytics https://marketingplatform.google.com/about/analytics https://twitter.com https://github.com https://stackoverflow.com https://www.linkedin.com https://dribbble.com https://www.instagram.com https://www.facebook.com https://www.google-analytics.com ; base-uri 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com; block-all-mixed-content; connect-src 'self' ws: ; img-src 'self' data: https://www.google-analytics.com; manifest-src 'self'; font-src blob 'self'; style-src 'self' blob 'unsafe-inline' fonts.googleapis.com;"
      /> */}
      <meta
        name="description"
        content={description || site.siteMetadata.description}
      />
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
      <meta
        name="google-site-verification"
        content="SjjIT31sWEJ5ZN2ADsgkGuVZCCJSS0KyvBODf6g0Ijw"
      />
      <meta name="subject" content={title || site.siteMetadata.title} />
      <meta
        name="keywords"
        content={
          keywords ||
          'HTML5,CSS3,JavaScript,React,UI,UX,CSS-in-JS,Animation,Frontend Developer,Webpack,Node.js,GraphQL,Performance,60fps,Full-Stack Developer in Bangalore,Full-Stack Developer in Bengaluru'
        }
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
      <meta property="og:title" content={title || site.siteMetadata.title} />
      <meta
        property="og:image"
        content={fbBanner || 'https://meetguns.com/images/fb-banner.png'}
      />
      <meta
        property="og:description"
        content={description || site.siteMetadata.description}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.siteMetadata.author} />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:url" content="https://meetguns.com" />
      <meta name="twitter:title" content={title || site.siteMetadata.title} />
      <meta
        name="twitter:description"
        content={description || site.siteMetadata.description}
      />
      <meta
        name="twitter:image"
        content={
          twitterBanner || 'https://meetguns.com/images/twitter-banner.png'
        }
      />
    </Helmet>
  );
}

export default SEO;
