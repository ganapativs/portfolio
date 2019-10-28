import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import Gallery from 'react-photo-gallery';
import styled from 'styled-components';
import Carousel, { Modal, ModalGateway } from 'react-images';
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
  bottom: calc(0.4rem + ${props => props.margin}px);
  right: calc(0.4rem + ${props => props.margin}px);
  background: var(--color-dark);
  color: var(--color-accent);
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  border-radius: 50px 50px 0 50px;
  font-weight: bold;
  transform: scale(0.7);
  transform-origin: 100% 100%;
  opacity: 0;
  box-shadow: 0.15rem 0.15rem var(--color-accent);
  clip-path: circle(0% at 100% 100%);
  transition: all 0.15s ease-out;
`;

const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;

  @media screen and (hover: hover) and (pointer: fine) {
    &:hover ${MetaInfo} {
      transition: all 0.15s 0.15s linear;
      transform: translateY(0) translateX(0) scale(0.85);
      clip-path: circle(100% at 50% 50%);
      opacity: 1;
    }
  }
`;

const CSSViewWrapper = styled.div`
  max-width: 840px;
  margin: 0 auto;
  padding: 0 10px;
`;

const CSSView = styled.div`
  column-count: 2;
  column-gap: 5px;

  @media screen and (max-width: 767px) {
    column-count: 1;
    column-gap: 0;
  }
`;

const hasWebPSupport = () => {
  const canvas =
    typeof document === 'object' ? document.createElement('canvas') : {};
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL
    ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5
    : false;
};

const getPhotoMetaInfo = photo => {
  console.log('TCL: photo', photo);
  const { location, DateTimeOriginal } = photo.meta;
  const date = DateTimeOriginal ? new Date(DateTimeOriginal * 1000) : null;

  return { location: location || '—', date };
};

const RenderMetaInfo = ({ photo }) => {
  const { location, date } = getPhotoMetaInfo(photo);

  return (
    <div>
      <div>{location}</div>
      {date ? (
        <small style={{ opacity: 0.9 }}>
          {monthNames[date.getMonth()]} {date.getFullYear()}
        </small>
      ) : null}
    </div>
  );
};

const ImageMeta = ({ margin, photo }) => {
  return (
    <MetaInfo margin={margin}>
      <RenderMetaInfo photo={photo} />
    </MetaInfo>
  );
};

const FixedCapturesIndexLayout = ({
  photos,
  previous,
  next,
  currentPage,
  totalPages,
}) => (
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
              to={`/captures/${currentPage !== 2 ? currentPage - 1 : ''}`}
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
);

const FooterCaption = ({ currentView: photo }) => (
  <RenderMetaInfo photo={photo} />
);

class CapturesIndex extends React.Component {
  constructor(props) {
    super(props);
    const {
      pageContext: { pageImages, currentPage, totalPages },
    } = props;

    this.isWebPSupported = hasWebPSupport();
    this.loading = false;

    this.state = {
      isMobileLayout: false,
      jsEnabled: false,
      images: [pageImages],
      currentPage,
      totalPages,
      showSentinel: false,
      lightboxOpen: false,
    };
  }

  resizeHandler = () => {
    const containerWidth = window.innerWidth;
    this.setState({
      isMobileLayout: containerWidth < 768,
    });
  };

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler, true);
    this.setState({
      jsEnabled: true,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler, true);
  }

  onFetchMore = async () => {
    const { images, currentPage } = this.state;
    if (this.loading) {
      return;
    }

    try {
      this.loading = true;
      const nextImages = await fetch(
        `/captures-pagination/index-${currentPage + 1}.json`,
      ).then(t => t.json());
      this.setState(
        {
          images: [...images, nextImages],
          currentPage: currentPage + 1,
        },
        () => {
          this.loading = false;
        },
      );
    } catch (e) {
      console.log('Error in fetching more images.', e);
      this.loading = false;
    }
  };

  showSentinel = () => {
    const { showSentinel } = this.state;

    if (!showSentinel) {
      this.setState({
        showSentinel: true,
      });
    }
  };

  toggleLightbox = (e, idx) => {
    this.setState(({ lightboxOpen }) => ({
      lightboxOpen: !lightboxOpen,
      selectedIndex: idx,
    }));
  };

  getCarouselImages = () => {
    const { images } = this.state;

    const carouselImages = images
      .reduce((p, c) => [...p, ...c], [])
      .map(t => {
        const { srcWebp, src } = t.node.childImageSharp.preview;

        return {
          src: this.isWebPSupported ? srcWebp : src,
          meta: {
            ...t.node.EXIF,
            location: t.node.fields && t.node.fields.geolocation.Label,
          },
        };
      });

    return carouselImages;
  };

  renderImage = ({ photo, margin, key, index }) => {
    return (
      <ImageWrapper
        key={key}
        className="animated fadeIn faster"
        onClick={() => this.toggleLightbox(null, index)}>
        <Img
          onLoad={this.showSentinel}
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
  };

  renderGallery = () => {
    const { isMobileLayout, images } = this.state;

    return images.map(batch => {
      const photos = batch.map(t => ({
        ...t.node.childImageSharp.original,
        src:
          t.node.childImageSharp[
            isMobileLayout ? 'mobileThumb' : 'desktopThumb'
          ].src,
        img:
          t.node.childImageSharp[
            isMobileLayout ? 'mobileThumb' : 'desktopThumb'
          ],
        id: t.node.id,
        meta: {
          ...t.node.EXIF,
          location: t.node.fields && t.node.fields.geolocation.Label,
        },
      }));

      return (
        <Gallery
          key={photos[0].id}
          targetRowHeight={isMobileLayout ? 220 : 250}
          margin={4}
          photos={photos}
          renderImage={this.renderImage}
        />
      );
    });
  };

  render() {
    const {
      images,
      jsEnabled,
      currentPage,
      totalPages,
      showSentinel,
      lightboxOpen,
      selectedIndex,
    } = this.state;
    const previous = currentPage > 1;
    const next = currentPage < totalPages;

    let View = null;

    if (jsEnabled) {
      const carouselImages = this.getCarouselImages();

      View = (
        <>
          {this.renderGallery()}
          <ModalGateway>
            {lightboxOpen ? (
              <Modal onClose={this.toggleLightbox}>
                <Carousel
                  components={{ FooterCaption }}
                  currentIndex={selectedIndex}
                  views={carouselImages}
                  trackProps={{
                    onViewChange: currentIndex => {
                      if (currentIndex > carouselImages.length - 5) {
                        this.onFetchMore();
                      }
                    },
                  }}
                />
              </Modal>
            ) : null}
          </ModalGateway>
          {showSentinel && currentPage < totalPages ? (
            <Sentinel
              fetchMoreBufferDistance={1000}
              onFetchMore={this.onFetchMore}>
              <Loader />
            </Sentinel>
          ) : null}
        </>
      );
    } else {
      View = (
        <noscript>
          <FixedCapturesIndexLayout
            photos={images[0]}
            previous={previous}
            next={next}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </noscript>
      );
    }

    return (
      <>
        <SEO title="Captures" />
        <Main>{View}</Main>
      </>
    );
  }
}

export default CapturesIndex;
