const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');
const { createFilePath } = require('gatsby-source-filesystem');
const { getImageGeoLocation } = require('./gatsby/getImageGeoLocation');

// https://github.com/gatsbyjs/gatsby/issues/6291
sharp.simd(false);
sharp.cache(false);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // Image files
  if (
    node.internal.mediaType === 'image/jpeg' &&
    node.internal.type === 'S3ImageAsset'
  ) {
    getImageGeoLocation(node, createNodeField);
  }

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: `blog` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const showDraftPosts = process.env.NODE_ENV === 'development';

  const postQueries = new Promise((resolve, reject) => {
    createPage({
      path: `/blog/`,
      component: path.resolve('./src/templates/blog-index.js'),
      context: {
        showDraftPosts,
      },
    });

    graphql(
      `
          {
            allMdx(
              sort: { fields: [frontmatter___date], order: DESC }
              filter: { frontmatter: { draft: { eq: ${showDraftPosts} } } }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `,
    ).then(result => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
        return;
      }

      // Create blog posts pages.
      const posts = result.data.allMdx.edges;
      const blogPost = path.resolve('./src/templates/blog-post.js');
      posts.forEach((post, index) => {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: `/blog${post.node.fields.slug}`,
          component: blogPost,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        });
      });

      resolve();
    });
  });

  const captureQueries = new Promise(resolve => {
    createPage({
      path: `/captures/`,
      component: path.resolve('./src/templates/captures-index.js'),
    });

    resolve();
  });

  return Promise.all([postQueries, captureQueries]);
};
