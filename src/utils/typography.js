import Typography from 'typography';
import theme from 'typography-theme-funston';
import CodePlugin from 'typography-plugin-code';

theme.plugins = [new CodePlugin()];
console.log('TCL: theme', theme);

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

const typography = new Typography(theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const { rhythm } = typography;
export const { scale } = typography;
