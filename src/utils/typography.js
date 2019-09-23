import Typography from 'typography';
import theme from 'typography-theme-funston';
import CodePlugin from 'typography-plugin-code';

theme.plugins = [new CodePlugin()];

// Fonts are loaded globally in gatsby-config
delete theme.googleFonts;

theme.bodyFontFamily = ['Source Sans Pro', 'sans-serif'];
theme.headerFontFamily = ['Merriweather', 'sans-serif'];

theme.overrideThemeStyles = () => ({
  a: {
    color: 'var(--color-accent)',
  },
  hr: {
    background: 'var(--color-light-op-3)',
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
  'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
    fontSize: 'inherit',
  },
  'li code': {
    fontSize: '1rem',
  },
  blockquote: {
    color: 'inherit',
    borderLeft: 0,
    fontFamily: "'Merriweather',sans-serif",
    margin: '2.5em auto',
    fontStyle: 'italic',
    padding: '0 1.5rem',
    lineHeight: 'inherit',
  },
  'blockquote.translation': {
    fontSize: '1em',
  },
  iframe: {
    border: 0,
    borderRadius: '8px',
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
});

const typography = new Typography(theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
