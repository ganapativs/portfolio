import React from 'react';
import { Svg, Path } from './svg';

// https://www.flaticon.com/free-icon/arroba_684816#term=email&page=1&position=39
export default props => (
  <Svg
    width="24"
    height="24"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Code"
    role="img"
    viewBox="0 0 16 16">
    <Path d="M5.2 14l4.5-12h1.1l-4.5 12z" />
    <Path d="M11.1 13h1.2l3.7-5-3.7-5h-1.3l3.8 5z" />
    <Path d="M4.9 13h-1.2l-3.7-5 3.7-5h1.3l-3.8 5z" />
  </Svg>
);
