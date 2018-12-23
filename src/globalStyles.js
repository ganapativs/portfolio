import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyles = createGlobalStyle`
:root {
  --color-dark: ${props => (props.theme === 'dark' ? '#181819' : '#f0f3f9')};
  --color-dark-light: #313030;
  --color-light: ${props => (props.theme === 'dark' ? '#f0f3f9' : '#181819')};
  --color-light-dark: ${props =>
    props.theme === 'dark' ? '#505053' : '#A7B9DC'};
  --color-light-op-1: ${props =>
    props.theme === 'dark'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(24, 24, 25, 0.2)'};
  --color-light-op-2: ${props =>
    props.theme === 'dark'
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(24, 24, 25, 0.1)'};
  --color-light-op-3: ${props =>
    props.theme === 'dark'
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(24, 24, 25, 0.05)'};
  --color-blue: #673AB7;
  --color-orange: #ff7146;
  --color-red: #f1404b;
  --color-transparent: transparent;
}

* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--color-dark);
}

html, body, #root {
  height: 100%;
}

html.wf-active body{
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
}

a {
  text-decoration: none;
}

a, a:focus, a:active, a:hover {
  color: var(--color-red);
}

a:focus, a:active, a:hover {
  text-decoration: underline;
}

.animation-delay-half-s {
  animation-delay: 0.5s;
}
`;

export default React.memo(GlobalStyles);

export const TurnOffTransitionStyles = createGlobalStyle`
* {
  transition: ${props => (props.active ? 'none !important' : null)};
}
`;
