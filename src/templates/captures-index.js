import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import Gallery from 'react-photo-gallery';
import SEO from '../components/seo';

class CapturesIndex extends React.Component {
  render() {
    const { edges: thumbs } = this.props.data.allS3ImageAsset;
    const photos = thumbs.map(t => ({
      ...t.node.childImageSharp.original,
      src: t.node.childImageSharp.thumbnailSizes.src,
      img: t.node.childImageSharp.thumbnailSizes,
      id: t.node.id,
    }));
    console.log('TCL: CapturesIndex -> render -> photos', photos);

    return (
      <>
        <SEO title="Blog" />
        <main>
          <Gallery
            targetRowHeight={250}
            photos={photos}
            renderImage={({ photo, margin, key }) => (
              <div key={key} className="animated fadeIn faster">
                <Img
                  style={{
                    width: photo.width,
                    height: photo.height,
                    margin,
                  }}
                  fluid={photo.img}
                />
              </div>
            )}
          />
        </main>
      </>
    );
  }
}

export default CapturesIndex;

export const pageQuery = graphql`
  query CapturesIndex {
    allS3ImageAsset(sort: { fields: EXIF___DateTimeOriginal, order: DESC }) {
      edges {
        node {
          id
          childImageSharp {
            original {
              height
              width
            }
            thumbnailSizes: fluid(maxWidth: 512) {
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`;
