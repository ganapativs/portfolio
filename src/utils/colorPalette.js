const commonColors = {
  blue: '#673AB7',
  orange: '#ff7146',
  red: '#f1404b',
  transparent: 'transparent',
};

const dark = {
  ...commonColors,
  dark: '#0f0f10',
  light: '#f3f8f9',
  lightDark: '#747475',
  lightOp1: 'rgba(255, 255, 255, 0.2)',
  lightOp2: 'rgba(255, 255, 255, 0.1)',
  lightOp3: 'rgba(255, 255, 255, 0.05)',
};

const light = {
  ...commonColors,
  dark: '#f3f8f9',
  light: '#0f0f10',
  lightDark: '#909295',
  lightOp1: 'rgba(0, 0, 0, 0.2)',
  lightOp2: 'rgba(0, 0, 0, 0.1)',
  lightOp3: 'rgba(0, 0, 0, 0.05)',
};

const theme = { light, dark };

export default theme;
