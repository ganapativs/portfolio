import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Gallery from 'react-photo-gallery';
import SEO from '../components/seo';

class CapturesIndex extends React.Component {
  state = {
    columns: 4,
    direction: 'row',
  };

  resizeHandler = () => {
    const containerWidth = window.innerWidth;
    this.setState({
      columns: Math.floor(containerWidth / 350),
      direction: containerWidth < 768 ? 'column' : 'row',
    });
  };

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler, true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler, true);
  }

  render() {
    const { direction, columns } = this.state;
    const isMobileLayout = direction === 'column';
    const { edges: thumbs } = this.props.data.allS3ImageAsset;
    const photos = thumbs.map(t => ({
      ...t.node.childImageSharp.original,
      src:
        t.node.childImageSharp[isMobileLayout ? 'mobileSizes' : 'desktopSizes']
          .src,
      img:
        t.node.childImageSharp[isMobileLayout ? 'mobileSizes' : 'desktopSizes'],
      id: t.node.id,
    }));
    let additionalGalleryProps = {
      targetRowHeight: 500,
    };
    if (isMobileLayout) {
      additionalGalleryProps = {
        direction: 'column',
        columns,
      };
    }

    return (
      <>
        <SEO title="Captures" />
        <main style={{ width: '100%', position: 'relative' }}>
          <Gallery
            {...additionalGalleryProps}
            margin={4}
            photos={photos}
            renderImage={({ photo, margin, key, left, top }) => (
              <div
                key={key}
                className="animated fadeIn faster"
                style={{
                  left,
                  top,
                  position: isMobileLayout ? 'absolute' : 'relative',
                }}>
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
          fields {
            geolocation {
              adminArea5
              adminArea3
              adminArea1
              latitude
              longitude
            }
          }
          EXIF {
            DateTimeOriginal
          }
          childImageSharp {
            original {
              height
              width
              src
            }
            mobileSizes: fluid(maxHeight: 800, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
            desktopSizes: fluid(maxHeight: 500, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`;
