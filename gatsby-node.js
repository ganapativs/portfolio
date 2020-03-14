const fs = require('fs-extra');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');
const { createFilePath } = require('gatsby-source-filesystem');

// https://github.com/gatsbyjs/gatsby/issues/6291
sharp.simd(false);
sharp.cache(false);

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const basePath = `blog`;
    const slug = createFilePath({ node, getNode, basePath });

    await createNodeField({
      node,
      name: `slug`,
      value: `/${basePath}${slug}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const showAllPosts = process.env.NODE_ENV === 'development';
  createPage({
    path: `/blog/`,
    component: path.resolve('./src/templates/blog-index.js'),
  });

  const blogPosts = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          ${
            showAllPosts
              ? ''
              : 'filter: { frontmatter: { draft: { eq: false } } }'
          }
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
  );

  if (blogPosts.errors) {
    console.log(blogPosts.errors);
    return;
  }

  // Create blog posts pages.
  const posts = blogPosts.data.allMdx.edges;
  const blogPost = path.resolve('./src/templates/blog-post.js');
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  const capturesIndex = path.resolve('./src/templates/captures-index.js');
  const imagesCountPerPage = 40;
  let currentPage = 1;
  do {
    const currentJSONFile = path.resolve(
      __dirname,
      `static/captures/page-${currentPage}.json`,
    );

    if (!fs.existsSync(currentJSONFile)) {
      console.error(
        'Captures images are not built. Run `yarn prebuild-captures` to prebuild images.',
      );
      process.exit(-1);
    }

    const { hasMore, totalPages, images } = fs.readJSONSync(currentJSONFile);

    const pathSuffix =
      currentPage > 1
        ? currentPage
        : ''; /* To create paths "/", "/2", "/3", ... */

    /* Combine all data needed to construct this page. */
    const pageData = {
      path: `/captures/${pathSuffix}`,
      component: capturesIndex,
      context: {
        /* If you need to pass additional data, you can pass it inside this context object. */
        pageImages: images,
        currentPage,
        totalPages,
        imagesCountPerPage,
      },
    };
    createPage(pageData);

    if (hasMore) {
      currentPage += 1;
    } else {
      console.log(
        `\nCreated ${currentPage} pages of capture index paginated content.`,
      );
      currentPage = null;
    }
  } while (currentPage !== null);
};
