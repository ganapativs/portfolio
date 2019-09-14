module.exports = {
  siteMetadata: {
    title: `Ganapati V S - Portfolio`,
    description: `Full-Stack JavaScript developer building stuffs using bleeding edge technologies 🎉`,
    author: `@ganapativs`,
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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Oswald`,
            subsets: [`latin`],
          },
          {
            family: `Source Sans Pro`,
            variants: [`300`, `400`],
          },
        ],
      },
    },
    `gatsby-plugin-dark-mode`,
    // https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
};
