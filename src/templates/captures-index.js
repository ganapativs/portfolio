import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Gallery from 'react-photo-gallery';
import styled from 'styled-components';
import SEO from '../components/seo';
import Sentinel from '../components/sentinel';
import Loader from '../components/loader';

const Main = styled.main`
  width: 100%;
  position: relative;

  @media screen and (max-width: 767px) {
    margin: 0 -20px;
    width: calc(100% + 40px);
  }
`;

const Ul = styled.ul`
  list-style: none;
  margin-left: 0;
`;

class CapturesIndex extends React.Component {
  constructor(props) {
    super(props);
    const {
      pageContext: { pageImages, currentPage, totalPages },
    } = props;

    this.state = {
      columns: 4,
      direction: 'row',
      infiniteScrollEnabled: false,
      loading: false,
      pageImages,
      currentPage,
      totalPages,
    };
  }

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

    const {
      pageContext: { currentPage },
    } = this.props;
    // Only enable infinite scrolling if user is on first page and JS is enabled
    // Else fall back to pagination
    this.setState({
      infiniteScrollEnabled: currentPage === 1,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler, true);
  }

  onFetchMore = () => {
    const { loading, pageImages, currentPage } = this.state;
    if (loading) {
      return;
    }

    this.setState(
      {
        loading: true,
      },
      async () => {
        try {
          const nextImages = await fetch(
            `/captures-pagination/index-${currentPage + 1}.json`,
          ).then(t => t.json());
          this.setState({
            pageImages: [...pageImages, ...nextImages],
            currentPage: currentPage + 1,
            loading: false,
          });
        } catch (e) {
          console.log('Error in fetching more images.', e);
        }
      },
    );
  };

  render() {
    const {
      direction,
      columns,
      infiniteScrollEnabled,
      pageImages,
      currentPage,
      totalPages,
    } = this.state;
    const previous = currentPage > 1;
    const next = currentPage < totalPages;
    const isMobileLayout = direction === 'column';
    const photos = pageImages.map(t => ({
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
        <Main>
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
          {infiniteScrollEnabled ? (
            <>
              {currentPage < totalPages ? (
                <Sentinel
                  fetchMoreBufferDistance={1000}
                  onFetchMore={this.onFetchMore}>
                  <Loader />
                </Sentinel>
              ) : null}
            </>
          ) : (
            <nav>
              <Ul>
                <li>
                  {previous ? (
                    <Link
                      to={`/captures/${
                        currentPage !== 2 ? currentPage - 1 : ''
                      }`}
                      rel="prev">
                      ← Previous
                    </Link>
                  ) : null}
                </li>
                <li>
                  {next ? (
                    <Link to={`/captures/${currentPage + 1}`} rel="next">
                      Next →
                    </Link>
                  ) : null}
                </li>
              </Ul>
            </nav>
          )}
        </Main>
      </>
    );
  }
}

export default CapturesIndex;
