import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/seo';

import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';

const GITHUB_USERNAME = 'ganapativs';
const GITHUB_REPO_NAME = 'Portfolio';

const PostInfo = styled.p`
  color: var(--color-light-dark);
  font-weight: bold;
`;

const Ul = styled.ul`
  list-style: none;
  margin-left: 0;
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next, slug } = this.props.pageContext;

    // Replace original links with translated when available.
    const { html } = post;

    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${slug.slice(
      1,
      slug - 1,
    )}index.md`;
    const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
      `https://meetguns.com/blog/${slug}`,
    )}`;

    return (
      <div
        // Remove 2em padding space of blog card
        style={{ width: '100%', maxWidth: 644, margin: '0 auto' }}
        className="animated fadeIn fast">
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
        />
        <main>
          <article>
            <header>
              <h1
                style={{
                  color: 'var(--textTitle)',
                  marginTop: rhythm(1 / 2),
                }}>
                {post.frontmatter.title}
              </h1>
              <PostInfo
                style={{
                  ...scale(-1 / 5),
                  marginBottom: rhythm(1),
                  marginTop: rhythm(-3 / 5),
                }}>
                {formatPostDate(post.frontmatter.date)}
                {` • ${formatReadingTime(post.timeToRead)}`}
              </PostInfo>
            </header>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <footer>
              <p>
                <a href={discussUrl} target="_blank" rel="noopener noreferrer">
                  Discuss on Twitter
                </a>
                {` • `}
                <a href={editUrl} target="_blank" rel="noopener noreferrer">
                  Edit on GitHub
                </a>
              </p>
            </footer>
          </article>
        </main>
        <nav>
          <Ul>
            <li>
              {previous ? (
                <Link to={`/blog${previous.fields.slug}`} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              ) : null}
            </li>
            <li>
              {next ? (
                <Link to={`/blog${next.fields.slug}`} rel="next">
                  {next.frontmatter.title} →
                </Link>
              ) : null}
            </li>
          </Ul>
        </nav>
      </div>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
      }
      fields {
        slug
      }
    }
  }
`;
