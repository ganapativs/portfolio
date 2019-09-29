import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/seo';

const Ul = styled.ul`
  list-style: none;
  margin-left: 0;
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px 0;
`;

class CapturesPhoto extends React.Component {
  render() {
    const pic = this.props.data.allS3ImageAsset.edges[0].node;
    const { previous, next } = this.props.pageContext;

    return (
      <div style={{ width: '100%' }}>
        <SEO title="Captures" />
        <nav>
          <Ul>
            <li>
              {previous ? (
                <Link to={`/captures/${previous.id}`} rel="prev">
                  ← Previous
                </Link>
              ) : null}
            </li>
            <li>
              {next ? (
                <Link to={`/captures/${next.id}`} rel="next">
                  Next →
                </Link>
              ) : null}
            </li>
          </Ul>
        </nav>
        <main>
          <article>
            <a
              href={pic.childImageSharp.original.src}
              rel="noopener noreferrer"
              target="_blank">
              <Img fluid={pic.childImageSharp.largeSizes} />
            </a>
          </article>
        </main>
      </div>
    );
  }
}

export default CapturesPhoto;

export const pageQuery = graphql`
  query CapturesPhotoById($id: String!) {
    allS3ImageAsset(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          EXIF {
            DateTimeOriginal
            ExposureTime
            FNumber
            FocalLength
            ShutterSpeedValue
            ISO
            LensModel
            Model
            ShutterSpeedValue
          }
          fields {
            exif {
              gps {
                location {
                  adminArea5
                  adminArea3
                  adminArea1
                }
              }
            }
          }
          childImageSharp {
            original {
              height
              width
              src
            }
            largeSizes: fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`;
