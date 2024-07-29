import React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import SEO from '../components/seo';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';

const GITHUB_USERNAME = 'ganapativs';
const GITHUB_REPO_NAME = 'Portfolio';

const Article = styled.article`
  line-height: 1.75rem;
  font-family: 'Source Sans Pro', serif;

  // Put shadow around image(distinguish dark/light image from content)
  .gatsby-resp-image-wrapper {
    border-radius: 1rem;
    overflow: hidden;

    img {
      box-shadow: none !important;
    }
  }

  .gatsby-resp-image-figure {
    margin: ${rhythm(1)} 0 ${rhythm(1)} 0;
  }
`;

const PostInfo = styled.p`
  color: var(--color-light-dark);
  font-weight: bold;
  margin-bottom: ${rhythm(0.5)};
  margin-top: ${rhythm(-3 / 5)};

  @media screen and (max-width: 767px) {
    margin-bottom: ${rhythm(0.8)};
  }
`;

const Ul = styled.ul`
  list-style: none;
  margin-left: 0;
`;

const CoverImage = styled.div`
  overflow: hidden;

  @media screen and (max-width: 767px) {
    margin-bottom: ${rhythm(1.6)};
    min-height: 280px;
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    width: calc(100% + 40px);

    .gatsby-image-wrapper {
      min-height: 280px;
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) {
    margin-bottom: ${rhythm(1.6)};
    margin-left: -5rem;
    margin-right: -5rem;
    min-height: 300px;
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    margin-left: -3.5rem;
    margin-right: -3.5rem;
  }

  @media screen and (min-width: 992px) {
    border-radius: 1rem;
    margin-top: ${rhythm(0.6)};
  }

  @media screen and (hover: hover) and (pointer: fine) {
    overflow: hidden;
  }
`;

const Div = styled.div`
  width: 100%;
  max-width: 644px;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    padding-top: 1rem;
    max-width: 100%;
  }
`;

const HeaderSection = styled.div`
  position: relative;

  @media screen and (max-width: 767px) {
    min-height: 280px;
  }

  > header {
    --opacity: 0.2;
    position: absolute;
    // https://css-tricks.com/easing-linear-gradients/
    // https://larsenwork.com/easing-gradients/
    background: linear-gradient(
      to bottom,
      hsla(0, 0%, 0%, 0) 0%,
      hsla(0, 0%, 0%, 0.041) 12.3%,
      hsla(0, 0%, 0%, 0.088) 22.2%,
      hsla(0, 0%, 0%, 0.14) 30.1%,
      hsla(0, 0%, 0%, 0.198) 36.3%,
      hsla(0, 0%, 0%, 0.259) 41.3%,
      hsla(0, 0%, 0%, 0.325) 45.3%,
      hsla(0, 0%, 0%, 0.393) 48.7%,
      hsla(0, 0%, 0%, 0.465) 52%,
      hsla(0, 0%, 0%, 0.539) 55.4%,
      hsla(0, 0%, 0%, 0.614) 59.4%,
      hsla(0, 0%, 0%, 0.691) 64.3%,
      hsla(0, 0%, 0%, 0.768) 70.4%,
      hsla(0, 0%, 0%, 0.846) 78.2%,
      hsla(0, 0%, 0%, 0.923) 87.9%,
      hsl(0, 0%, 0%) 100%
    );
    height: 100%;
    color: white;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-end;
    left: -20px;
    top: 0;
    width: calc(100% + 40px);
    padding-left: 20px;
    padding-right: 20px;
    width: calc(100% + 40px);

    @media screen and (min-width: 768px) {
      border-radius: 1rem;
      width: calc(100% + 10rem);
      padding-left: 5rem;
      padding-right: 5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      top: 0;
      left: -5rem;
    }

    @media screen and (min-width: 768px) and (max-width: 991px) {
      width: calc(100% + 7rem);
      left: -3.5rem;
      padding-left: 3.5rem;
      padding-right: 3.5rem;
    }

    @media screen and (max-width: 991px) {
      border-radius: 0;
    }
  }
`;

class BlogPostTemplate extends React.Component {
  render() {
    const { node: post } = this.props.data.blogPost.edges[0];
    const { body, fields: { timeToRead: { text: timeToReadText } = {} } = {} } =
      post;
    const { previous, next, slug } = this.props.pageContext;

    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src${slug}index.mdx`;
    const blogUrl = `https://meetguns.com${slug}`;
    const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
      blogUrl,
    )}`;

    return (
      <Div>
        <style>
          {`
          html {
              scroll-behavior: smooth;
          }
          `}
        </style>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          keywords={post.frontmatter.keywords}
          fbBanner={`${blogUrl}twitter-card.jpg`}
          twitterBanner={`${blogUrl}twitter-card.jpg`}
        />
        <main>
          <Article>
            <HeaderSection>
              {post.frontmatter.cover ? (
                <CoverImage>
                  <GatsbyImage
                    image={
                      post.frontmatter.cover.childImageSharp.gatsbyImageData
                    }
                  />
                </CoverImage>
              ) : null}
              <header>
                <h1
                  style={{
                    marginTop: rhythm(1 / 2),
                  }}
                >
                  {post.frontmatter.title}
                </h1>
                <PostInfo
                  style={{
                    ...scale(-1 / 5),
                  }}
                >
                  {formatPostDate(post.frontmatter.date)}
                  {` • ${timeToReadText}`} •{' '}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Checkout this blog about "${post.frontmatter.title}" by @ganapativs\n\n${blogUrl}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tweet
                  </a>
                </PostInfo>
              </header>
            </HeaderSection>
            {this.props.children}
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
      </Div>
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
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            spoiler
            keywords
            cover {
              childImageSharp {
                gatsbyImageData(quality: 85, layout: FULL_WIDTH)
              }
            }
          }
          fields {
            slug
            timeToRead {
              text
            }
          }
        }
      }
    }
  }
`;
