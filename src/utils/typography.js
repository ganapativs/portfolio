import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import { TABLET_MEDIA_QUERY } from 'typography-breakpoint-constants';

const theme = {
  title: 'Meetguns',
  scaleRatio: 1.6,
  baseFontSize: '18px',
  bodyColor: 'var(--color-light)',
  bodyFontFamily: ['Source Sans Pro', 'sans-serif'],
  headerFontFamily: ['Merriweather', 'serif'],
  headerWeight: '700',
  bodyWeight: 400,
  boldWeight: 600,
  includeNormalize: true,
  plugins: [new CodePlugin()],
  overrideStyles: () => ({
    a: {
      textDecoration: 'none',
    },
    'a, a:focus, a:active, a:hover': {
      color: 'var(--color-accent)',
    },
    'a:focus, a:active, a:hover': {
      textDecoration: 'underline',
    },
    'a code': {
      color: 'var(--color-accent) !important',
    },
    hr: {
      background: 'var(--color-light-op-2)',
    },
    'a.gatsby-resp-image-link': {
      boxShadow: 'none',
    },
    // These two are for gatsby-remark-autolink-headers:
    'a.anchor': {
      boxShadow: 'none',
    },
    'a.anchor svg[aria-hidden="true"]': {
      stroke: 'var(--color-accent)',
    },
    'p code': {
      fontSize: '1rem',
    },
    'h1, h2, h3, h4, h5, h6': {
      lineHeight: 1.4,
    },
    'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
      fontSize: 'inherit',
    },
    'li code': {
      fontSize: '1rem',
    },
    blockquote: {
      color: 'inherit',
      fontFamily: "'Source Sans Pro',sans-serif",
      margin: '2rem auto',
      padding: '0 1.5rem',
      lineHeight: 'inherit',
      borderLeft: '4px solid var(--color-accent)',
    },
    'blockquote.translation': {
      fontSize: '1em',
    },
    iframe: {
      border: 0,
      maxWidth: '100%',
      overflow: 'auto',
      marginBottom: 0,
    },
    figure: {
      marginTop: '2.4rem',
      marginBottom: '2.4rem',
    },
    figcaption: {
      textAlign: 'center',
      margin: '1em',
      fontSize: '0.8rem',
      color: 'var(--color-light-dark)',
    },
    [TABLET_MEDIA_QUERY]: {
      blockquote: {
        padding: '0 .8rem',
      },
    },
  }),
};

// Fonts are loaded globally in gatsby-config
delete theme.googleFonts;

const typography = new Typography(theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
