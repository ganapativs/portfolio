const commonColors = {
  blue: '#673AB7',
  orange: '#ff7146',
  red: '#f1404b',
  transparent: 'transparent',
};

const dark = {
  ...commonColors,
  dark: '#181819',
  light: '#f0f3f9',
  lightDark: '#505053',
  lightOp1: 'rgba(255, 255, 255, 0.2)',
  lightOp2: 'rgba(255, 255, 255, 0.1)',
  lightOp3: 'rgba(255, 255, 255, 0.05)',
};

const light = {
  ...commonColors,
  dark: '#f0f3f9',
  light: '#181819',
  lightDark: '#A7B9DC',
  lightOp1: 'rgba(24, 24, 25, 0.2)',
  lightOp2: 'rgba(24, 24, 25, 0.1)',
  lightOp3: 'rgba(24, 24, 25, 0.05)',
};

const theme = { light, dark };

export default theme;
