import Typography from 'typography';
import theme from 'typography-theme-funston';
import CodePlugin from 'typography-plugin-code';

theme.plugins = [new CodePlugin()];

theme.googleFonts = [
  {
    name: 'Merriweather',
    styles: ['700'],
  },
  {
    name: 'Source Sans Pro',
    styles: ['400', '400i', '300'],
  },
];

theme.bodyFontFamily = ['Source Sans Pro', 'georgia', 'sans-serif'];
theme.headerFontFamily = ['Merriweather', 'sans-serif'];

theme.overrideThemeStyles = () => ({
  a: {
    color: 'var(--color-red)',
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
    stroke: 'var(--color-red)',
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
    borderLeftColor: 'inherit',
    opacity: '0.8',
  },
  'blockquote.translation': {
    fontSize: '1em',
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
