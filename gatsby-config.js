// TODO:
// - Blog header improve list and detail
// - Improve blog readability - change font
// - Remove feedback, Hand-crafted in India with ❤
// - Better dark mode transition
// - SGB vercel + priority
// - Page transition animation - blog
// - Cleanup S3 bucket
// - gatsby-plugin-react-helmet: Gatsby now has built-in support for modifying the document head. Learn more at https://gatsby.dev/gatsby-head
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: `Ganapati V S`,
    description: `Full-Stack JavaScript developer building stuff using bleeding-edge technologies 🎉`,
    author: `@ganapativs`,
    siteUrl: 'https://meetguns.com',
    social: {
      twitter: '@ganapativs',
      github: '@ganapativs',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-twitter-cards`,
            options: {
              title: 'meetguns.com',
              separator: '|',
              author: 'Ganapati V S',
              // background: require.resolve('./content/assets/base.png'), // defaults to black
              background: '#0f0f10',
              fontColor: '#f3f8f9',
              titleFontSize: 96,
              subtitleFontSize: 60,
              fontStyle: 'monospace',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1500,
              showCaptions: true,
              quality: 85,
              withWebp: { quality: 85 },
            },
          },
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: `gatsby-remark-embedder`,
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            // TODO: Replace with "mdx-component-autolink-headers" when offset is supported
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: '÷',
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                const { siteUrl } = site.siteMetadata;

                return {
                  ...edge.node.frontmatter,
                  description: edge.node.frontmatter.spoiler,
                  date: edge.node.frontmatter.date,
                  url: siteUrl + edge.node.fields.slug,
                  guid: siteUrl + edge.node.fields.slug,
                };
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] }
                  ${
                    process.env.NODE_ENV === 'development'
                      ? ''
                      : 'filter: { frontmatter: { draft: { ne: true } } }'
                  }
                  limit: 1000,
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        spoiler
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'meetguns.com/blog - RSS Feed',
          },
        ],
      },
    },
    'gatsby-plugin-image',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        short_name: 'meetguns',
        name: 'meetguns',
        icon: 'src/images/icon-512x512.png',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#0f0f10',
        background_color: '#0f0f10',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-52929584-1',
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Merriweather\:700,400,400i`,
          `Source Sans Pro\:400`,
          `Fira Code\:400,400i`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `var(--color-accent)`,
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-accent-color`,
      options: {
        defaultAccentColor: `#FF2E63`,
      },
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    // Disabling temporarily
    // {
    //   resolve: `gatsby-plugin-hotjar`,
    //   options: {
    //     id: process.env.HOTJAR_ID,
    //     sv: process.env.HOTJAR_SNIPPET_VERSION,
    //   },
    // },
    // https://www.gatsbyjs.org/packages/gatsby-plugin-offline/
    `gatsby-plugin-offline`,
  ],
};
