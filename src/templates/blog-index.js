import { Link, graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const Article = styled.article``;

const Small = styled.small`
  color: var(--color-light-dark);
  font-weight: bold;
`;

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
              <Article
                key={node.fields.slug}
                style={{
                  marginBottom: rhythm(1.5),
                }}>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}>
                    <Link
                      style={{ boxShadow: 'none' }}
                      to={`/blog${node.fields.slug}`}
                      rel="bookmark">
                      {title}
                    </Link>
                  </h3>
                  <Small>
                    {formatPostDate(node.frontmatter.date)}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </Small>
                </header>
                <p
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
                />
              </Article>
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
