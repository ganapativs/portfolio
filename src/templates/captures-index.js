import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Gallery from 'react-photo-gallery';
import styled from 'styled-components';
import SEO from '../components/seo';
import Sentinel from '../components/sentinel';
import Loader from '../components/loader';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Main = styled.main`
  width: 100%;
  position: relative;
  min-height: 100vh;

  @media screen and (max-width: 767px) {
    margin: 0 -20px;
    width: calc(100% + 40px);
  }
`;

const Ul = styled.ul`
  list-style: none;
  margin-left: 0;
`;

const MetaInfo = styled.div`
  position: absolute;
  bottom: calc(1rem + ${props => props.margin}px);
  right: calc(1rem + ${props => props.margin}px);
  background: var(--color-dark);
  color: var(--color-accent);
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  border-radius: 50px 50px 0 50px;
  font-weight: bold;
  transform: translateY(1rem) translateX(1rem) scale(0.7);
  transform-origin: 100% 100%;
  opacity: 0;
  box-shadow: 0.2rem 0.2rem var(--color-accent);
  clip-path: circle(0% at 100% 100%);
  transition: all 0.15s ease-out;

  @media screen and (max-width: 767px) {
    transform: translateY(0) translateX(0) scale(1);
    clip-path: circle(100% at 50% 50%);
    opacity: 1;
    border-radius: 20px;
    padding: 0.2rem 0.5rem;
    background: transparent;
    color: var(--color-light);
    font-size: 0.6rem;
    box-shadow: none;
    overflow: hidden;

    small {
      display: none;
    }

    &:before {
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      opacity: 0.8;
      background: var(--color-dark);
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover ${MetaInfo} {
      transition: all 0.15s 0.15s linear;
      transform: translateY(0) translateX(0) scale(1);
      clip-path: circle(100% at 50% 50%);
      opacity: 1;
    }
  }
`;

const CSSViewWrapper = styled.div`
  max-width: 840px;
  margin: 0 auto;
`;

const CSSView = styled.div`
  column-count: 2;
  column-gap: 10px;

  @media screen and (max-width: 767px) {
    column-count: 1;
    column-gap: 0;
  }
`;

const ImageMeta = ({ margin, photo }) => {
  const { adminArea5, adminArea3, adminArea1, DateTimeOriginal } = photo.meta;
  const location =
    [adminArea5, adminArea3, adminArea1].filter(Boolean).join(', ') ||
    'Location unavailable';
  const date = DateTimeOriginal ? new Date(DateTimeOriginal * 1000) : null;

  return (
    <MetaInfo margin={margin}>
      <div>{location}</div>
      {date ? (
        <small style={{ opacity: 0.9 }}>
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </small>
      ) : null}
    </MetaInfo>
  );
};

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
      meta: {
        ...t.node.EXIF,
        ...(t.node.fields && t.node.fields.geolocation),
      },
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
          {infiniteScrollEnabled ? (
            <>
              <Gallery
                {...additionalGalleryProps}
                margin={4}
                photos={photos}
                renderImage={({ photo, margin, key, left, top }) => {
                  return (
                    <ImageWrapper
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
                      <ImageMeta margin={margin} photo={photo} />
                    </ImageWrapper>
                  );
                }}
              />
              {currentPage < totalPages ? (
                <Sentinel
                  fetchMoreBufferDistance={2500}
                  onFetchMore={this.onFetchMore}>
                  <Loader />
                </Sentinel>
              ) : null}
            </>
          ) : (
            <CSSViewWrapper>
              <CSSView>
                {photos.map(photo => (
                  <ImageWrapper
                    key={photo.id}
                    className="animated fadeIn faster"
                    style={{
                      breakInside: 'avoid',
                      // eslint-disable-next-line no-dupe-keys
                      breakInside: 'avoid-column',
                    }}>
                    <img
                      style={{ width: '100%', marginBottom: 0 }}
                      src={photo.src}
                      alt={photo.src}
                    />
                    <ImageMeta margin={4} photo={photo} />
                  </ImageWrapper>
                ))}
              </CSSView>
              <nav>
                <Ul>
                  <li>
                    {previous ? (
                      <Link
                        to={`/captures/${
                          currentPage !== 2 ? currentPage - 1 : ''
                        }`}
                        rel="prev">
                        ← Previous ({currentPage - 1} / {totalPages})
                      </Link>
                    ) : null}
                  </li>
                  <li>
                    {next ? (
                      <Link to={`/captures/${currentPage + 1}`} rel="next">
                        Next ({currentPage + 1} / {totalPages}) →
                      </Link>
                    ) : null}
                  </li>
                </Ul>
              </nav>
            </CSSViewWrapper>
          )}
        </Main>
      </>
    );
  }
}

export default CapturesIndex;
