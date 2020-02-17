import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from '../components/seo';

import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';

const GITHUB_USERNAME = 'ganapativs';
const GITHUB_REPO_NAME = 'Portfolio';

const Article = styled.article`
  line-height: 1.75rem;
  font-family: 'Merriweather', serif;

  // Put shadow around image(distinguish dark/light image from content)
  .gatsby-resp-image-wrapper {
    box-shadow: 0 0 1px var(--color-accent);
  }
`;

const PostInfo = styled.p`
  color: var(--color-light-dark);
  font-weight: bold;
`;

const Ul = styled.ul`
  list-style: none;
  margin-left: 0;
`;

const CoverImage = styled.div`
  margin-top: ${rhythm(1.8)};
  margin-bottom: ${rhythm(1.8)};
  border-radius: 14px;

  @media screen and (min-width: 768px) {
    margin-bottom: ${rhythm(2.5)};
    margin-left: -5rem;
    margin-right: -5rem;
  }

  @media screen and (hover: hover) and (pointer: fine) {
    overflow: hidden;
  }
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.blogPost.edges[0].node;
    const { body } = post;
    const { previous, next, slug } = this.props.pageContext;

    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src${slug}index.mdx`;
    const blogUrl = `https://meetguns.com${slug}`;
    const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
      blogUrl,
    )}`;

    return (
      <div
        // Remove 2em padding space of blog card
        style={{ width: '100%', maxWidth: 644, margin: '0 auto' }}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          keywords={post.frontmatter.keywords}
          fbBanner={`${blogUrl}twitter-card.jpg`}
          twitterBanner={`${blogUrl}twitter-card.jpg`}
        />
        <main>
          <Article>
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
                {` • ${formatReadingTime(post.timeToRead)}`} •{' '}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Checkout this blog about "${post.frontmatter.title}" by @ganapativs\n\n${blogUrl}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  Tweet
                </a>
              </PostInfo>
            </header>
            {post.frontmatter.cover ? (
              <CoverImage className="neumorphism">
                <Img fluid={post.frontmatter.cover.childImageSharp.fluid} />
              </CoverImage>
            ) : null}
            <MDXRenderer>{body}</MDXRenderer>
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
          </Article>
        </main>
        <nav>
          <Ul>
            <li>
              {previous ? (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              ) : null}
            </li>
            <li>
              {next ? (
                <Link to={next.fields.slug} rel="next">
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
    blogPost: allMdx(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          id
          body
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            spoiler
            keywords
            cover {
              childImageSharp {
                # Expected cover image to have 1/2 aspect ratio
                fluid(maxWidth: 1200, maxHeight: 600, quality: 85) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
