const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');
const { createFilePath } = require('gatsby-source-filesystem');
const { getImageGeoLocation } = require('./gatsby/getImageGeoLocation');

// https://github.com/gatsbyjs/gatsby/issues/6291
sharp.simd(false);
sharp.cache(false);

function createJSON(currentPage, pageImages) {
  const dir = 'public/captures-pagination/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const filePath = `${dir}index-${currentPage}.json`;
  const dataToSave = JSON.stringify(pageImages);
  fs.writeFile(filePath, dataToSave, err => {
    if (err) {
      return console.log(err);
    }
    return true;
  });
}

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

  const captureQueries = new Promise((resolve, reject) => {
    graphql(
      `
        {
          allS3ImageAsset(
            sort: { fields: EXIF___DateTimeOriginal, order: DESC }
          ) {
            edges {
              node {
                id
                fields {
                  geolocation {
                    adminArea5
                    adminArea3
                    adminArea1
                    latitude
                    longitude
                  }
                }
                EXIF {
                  DateTimeOriginal
                }
                childImageSharp {
                  original {
                    height
                    width
                    src
                  }
                  mobileThumb: fluid(maxHeight: 220, quality: 100) {
                    # GatsbyImageSharpFluid_withWebp
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                  desktopThumb: fluid(maxHeight: 250, quality: 100) {
                    # GatsbyImageSharpFluid_withWebp
                    base64
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                  preview: fluid(maxHeight: 800, quality: 100) {
                    src
                    srcWebp
                  }
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
      const capturesIndex = path.resolve('./src/templates/captures-index.js');
      const images = result.data.allS3ImageAsset.edges;
      /* Iterate needed pages and create them. */
      const countImagesPerPage = 50;
      const totalPages = Math.ceil(images.length / countImagesPerPage);
      for (let currentPage = 1; currentPage <= totalPages; currentPage += 1) {
        const pathSuffix =
          currentPage > 1
            ? currentPage
            : ''; /* To create paths "/", "/2", "/3", ... */

        /* Collect images needed for this page. */
        const startIndexInclusive = countImagesPerPage * (currentPage - 1);
        const endIndexExclusive = startIndexInclusive + countImagesPerPage;
        const pageImages = images.slice(startIndexInclusive, endIndexExclusive);

        /* Combine all data needed to construct this page. */
        const pageData = {
          path: `/captures/${pathSuffix}`,
          component: capturesIndex,
          context: {
            /* If you need to pass additional data, you can pass it inside this context object. */
            pageImages,
            currentPage,
            totalPages,
          },
        };

        /* Create normal pages (for pagination) and corresponding JSON (for infinite scroll). */
        createJSON(pageData.context.currentPage, pageData.context.pageImages);
        createPage(pageData);
      }
      console.log(
        `\nCreated ${totalPages} pages of capture index paginated content.`,
      );

      resolve();
    });
  });

  return Promise.all([postQueries, captureQueries]);
};
