import { Link, graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const Article = styled.article`
  cursor: pointer;

  @media screen and (min-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }

  @media screen and (hover: hover) and (pointer: fine) {
    transition: all 0.3s ease-out;

    &:hover {
      transition: all 0.15s ease-in;
      box-shadow: 2px 5px 25px -5px var(--color-light-op-1);
      /* transform: translateY(-2px); */
    }
  }
`;

const Small = styled.small`
  color: var(--color-light-dark);
  font-weight: bold;
`;

const Spoiler = styled.p`
  margin-bottom: 0;
`;

class BlogIndex extends React.Component {
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;

    return (
      <div
        style={{ width: '100%', maxWidth: 680, margin: '0 auto' }}
        className="animated fadeIn fast">
        <SEO title="Blog" />
        <main>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <Article
                key={node.fields.slug}
                // Skipping keyboard navigation as link inside will handle it
                onClick={() => this.props.navigate(`/blog${node.fields.slug}`)}
                style={{
                  marginBottom: rhythm(1),
                }}>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}>
                    <Link to={`/blog${node.fields.slug}`} rel="bookmark">
                      {title}
                    </Link>
                  </h3>
                  <Small>
                    {formatPostDate(node.frontmatter.date)}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </Small>
                </header>
                <Spoiler
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
