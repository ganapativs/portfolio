import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Gallery from 'react-photo-gallery';
import SEO from '../components/seo';

class CapturesIndex extends React.Component {
  state = {
    columns: 4,
  };

  resizeHandler = () => {
    const containerWidth = window.innerWidth;
    this.setState({
      columns: Math.floor(containerWidth / 350),
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
    const { edges: thumbs } = this.props.data.allS3ImageAsset;
    const photos = thumbs.map(t => ({
      ...t.node.childImageSharp.original,
      src: t.node.childImageSharp.thumbnailSizes.src,
      img: t.node.childImageSharp.thumbnailSizes,
      id: t.node.id,
    }));

    return (
      <>
        <SEO title="Captures" />
        <main style={{ width: '100%', position: 'relative' }}>
          <Gallery
            direction="column"
            columns={this.state.columns}
            margin={4}
            photos={photos}
            renderImage={({ photo, margin, key, left, top }) => (
              <div
                key={key}
                className="animated fadeIn faster"
                style={{ left, top, position: 'absolute' }}>
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
            thumbnailSizes: fluid(maxWidth: 512, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
            largeSizes: fluid(maxWidth: 2400, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
