const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { createFilePath } = require('gatsby-source-filesystem');
const readingTime = require(`reading-time`)

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

    // https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/?=gatsby-plugin-mdx#updating-mdx-nodes
    await createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body)
    })
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
          sort: { frontmatter: { date: DESC } }
          ${
            showAllPosts
              ? ''
              : 'filter: { frontmatter: { draft: { eq: false } } }'
          }
          limit: 1000
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
            internal {
              contentFilePath
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
  const posts = blogPosts.data.allMdx.nodes;
  const blogPost = path.resolve('./src/templates/blog-post.js');
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1];
    const next = index === 0 ? null : posts[index - 1];

    createPage({
      path: post.fields.slug,
      component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        slug: post.fields.slug,
        previous,
        next,
      },
    });
  });
};
