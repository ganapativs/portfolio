import { Link, graphql, navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import Seo from "../components/seo";
import { formatPostDate } from "../utils/helpers";
import { rhythm } from "../utils/typography";

const CoverImage = styled.div`
  width: 100%;
  margin-bottom: ${rhythm(0.5)};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  border-radius: 1rem;
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

function BlogIndex(props) {
	const isDev = process.env.NODE_ENV === "development";
	const { edges: posts } = props.data[`${isDev ? "dev" : "prod"}Mdx`];

	return (
		<Div>
			<Seo
				title="Blog by Ganapati V S"
				description="Tech blog by Ganapati V S"
			/>
			<main>
				{posts.map(({ node: post }) => {
					const title = post.frontmatter.title || post.fields.slug;
					const {
						fields: {
							timeToRead: { text: timeToReadText } = {},
						} = {},
					} = post;
					return (
						<Article
							key={post.fields.slug}
							// Skipping keyboard navigation as link inside will handle it
							onClick={() => navigate(post.fields.slug)}
						>
							<CoverImage>
								<GatsbyImage
									image={post.frontmatter.cover.childImageSharp.gatsbyImageData}
								/>
							</CoverImage>
							<header
								style={{
									marginBottom: rhythm(1 / 4),
								}}
							>
								<h3
									style={{
										marginBottom: rhythm(1 / 10),
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
                gatsbyImageData(quality: 85, layout: FULL_WIDTH)
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
                gatsbyImageData(quality: 85, layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`;
