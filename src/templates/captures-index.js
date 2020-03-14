import { Link } from 'gatsby';
import React, { useState } from 'react';
import Gallery from 'react-photo-gallery';
import styled from 'styled-components';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Helmet } from 'react-helmet';
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
    padding-top: 0.2rem;
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

  img {
    transition: opacity 0.3s ease-in;
  }

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

const getPhotoMetaInfo = photo => {
  const { Label, DateTimeOriginal } = photo.meta;
  const date = DateTimeOriginal ? new Date(DateTimeOriginal) : null;

  return { location: Label || '—', date };
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

const LoadImage = ({ src, alt, style, prominentColors, onLoad }) => {
  const [loaded, setLoaded] = useState(false);
  const [[r1, g1, b1], [r2, g2, b2]] = prominentColors;

  return (
    <div
      style={{
        ...style,
        background: `linear-gradient(135deg, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}))`,
      }}>
      <img
        style={{
          width: style.width,
          height: style.height,
          margin: 0,
          opacity: loaded ? 1 : 0,
        }}
        src={src}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
          onLoad();
        }}
      />
    </div>
  );
};

class CapturesIndex extends React.Component {
  constructor(props) {
    super(props);
    const {
      pageContext: { pageImages, currentPage, totalPages, imagesCountPerPage },
    } = props;

    this.loading = false;
    this.imagesCountPerPage = imagesCountPerPage;

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
    const { images, currentPage, totalPages } = this.state;
    if (this.loading) {
      return;
    }

    if (currentPage === totalPages) {
      return;
    }

    try {
      this.loading = true;
      const { images: nextImages } = await fetch(
        `/captures/page-${currentPage + 1}.json`,
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
      // eslint-disable-next-line no-console
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
        const { src, width, height, exif } = t;

        return {
          src,
          width,
          height,
          meta: {
            ...exif,
          },
        };
      });

    return carouselImages;
  };

  renderImage = (batchIndex, { photo, margin, key, index }) => {
    return (
      <ImageWrapper
        key={key}
        className="animated fadeIn faster"
        onClick={() =>
          this.toggleLightbox(
            null,
            this.imagesCountPerPage * batchIndex + index,
          )
        }>
        <LoadImage
          alt={photo.preview}
          src={photo.preview}
          prominentColors={photo.prominentColors}
          style={{
            width: photo.width,
            height: photo.height,
            margin,
          }}
          onLoad={this.showSentinel}
        />
      </ImageWrapper>
    );
  };

  getPhotosFromBatch = batch => {
    return batch.map(t => ({
      src: t.src,
      preview: t.preview,
      prominentColors: t.prominentColors,
      id: t.src,
      width: t.width,
      height: t.height,
      meta: {
        ...t.exif,
      },
    }));
  };

  renderGallery = () => {
    const { isMobileLayout, images } = this.state;

    return images.map((batch, batchIndex) => {
      const photos = this.getPhotosFromBatch(batch);

      return (
        <Gallery
          key={photos[0].id}
          targetRowHeight={isMobileLayout ? 220 : 250}
          margin={4}
          photos={photos}
          renderImage={this.renderImage.bind(this, batchIndex)}
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
          {/* Prefetch full images */}
          <Helmet>
            {carouselImages.map(t => (
              <link rel="prefetch" href={t.src} key={t.src} />
            ))}
          </Helmet>
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
            photos={this.getPhotosFromBatch(images[0])}
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
        <SEO title="Captures by Ganapati V S" />
        <Main>{View}</Main>
      </>
    );
  }
}

export default CapturesIndex;
