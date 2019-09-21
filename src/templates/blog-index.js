import { Link, graphql } from 'gatsby';
import React from 'react';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;

    return (
      <div style={{ width: '100%' }} className="animated fadeIn fast">
        <SEO title="Blog" />
        <main>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <article key={node.fields.slug}>
                <header>
                  <h3
                    style={{
                      fontSize: rhythm(1),
                      marginBottom: rhythm(1 / 4),
                    }}>
                    <Link
                      style={{ boxShadow: 'none' }}
                      to={`/blog${node.fields.slug}`}
                      rel="bookmark">
                      {title}
                    </Link>
                  </h3>
                  <small>
                    {formatPostDate(node.frontmatter.date)}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </small>
                </header>
                <p
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
                />
              </article>
            );
          })}
        </main>
      </div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`;
