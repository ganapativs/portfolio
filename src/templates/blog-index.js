import { Link, graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const CoverImage = styled.div`
  width: 100%;
  margin-bottom: ${rhythm(0.5)};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
`;

const Article = styled.article`
  cursor: pointer;
  padding: 1rem;
  margin-bottom: ${rhythm(1)};

  @media screen and (max-width: 767px) {
    padding: 0.5rem 1rem;
    margin: 0 -1rem;
    margin-bottom: ${rhythm(1)};
  }

  @media screen and (hover: hover) and (pointer: fine) {
    transition: transform 0.3s ease-in-out;

    &:hover {
      transition: transform 0.2s ease-in-out;
      transform: translateY(-2px);
    }
  }

  a {
    text-decoration: none;
  }
`;

const Small = styled.small`
  color: var(--color-light-dark);
  font-weight: bold;
`;

const Spoiler = styled.p`
  margin-bottom: 0;
`;

const Div = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    padding-top: 1.5rem;
  }
`;

class BlogIndex extends React.Component {
  render() {
    const isDev = process.env.NODE_ENV === 'development';
    const { edges: posts } = this.props.data[`${isDev ? 'dev' : 'prod'}Mdx`];

    return (
      <Div>
        <SEO
          title="Blog by Ganapati V S"
          description="Tech blog by Ganapati V S"
        />
        <main>
          {posts.map(({ node: post }) => {
            const title = post.frontmatter.title || post.fields.slug;
            const {
              fields: { timeToRead: { text: timeToReadText } = {} } = {},
            } = post;
            return (
              <Article
                key={post.fields.slug}
                // Skipping keyboard navigation as link inside will handle it
                onClick={() => navigate(post.fields.slug)}
              >
                <CoverImage>
                  <Img fluid={post.frontmatter.cover.childImageSharp.fluid} />
                </CoverImage>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link to={post.fields.slug} rel="bookmark">
                      {title}
                    </Link>
                  </h3>
                  <Small>
                    {formatPostDate(post.frontmatter.date)}
                    {` • ${timeToReadText}`}
                  </Small>
                </header>
                <Spoiler
                  dangerouslySetInnerHTML={{ __html: post.frontmatter.spoiler }}
                />
              </Article>
            );
          })}
        </main>
      </Div>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
        description
      }
    }
    devMdx: allMdx(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          fields {
            slug
            timeToRead {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            cover {
              childImageSharp {
                # Expected cover image to have 1/2 aspect ratio
                fluid(maxWidth: 1200, maxHeight: 600, quality: 85) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    prodMdx: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      edges {
        node {
          fields {
            slug
            timeToRead {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            cover {
              childImageSharp {
                # Expected cover image to have 1/2 aspect ratio
                fluid(maxWidth: 1200, maxHeight: 600, quality: 85) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;
