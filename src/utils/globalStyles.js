import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
body {
  --color-dark: #f3f8f9;
  --color-light: #0f0f10;
  --color-light-dark: #909295;
  --color-light-op-1: rgba(0, 0, 0, 0.2);
  --color-light-op-2: rgba(0, 0, 0, 0.1);
  --color-light-op-3: rgba(0, 0, 0, 0.05);
  --color-blue: #673AB7;
  --color-orange: #ff7146;
  --color-red: #f1404b;
  --color-transparent: transparent;
}

body.dark {
  --color-dark: #0f0f10;
  --color-light: #f3f8f9;
  --color-light-dark: #747475;
  --color-light-op-1: rgba(255, 255, 255, 0.2);
  --color-light-op-2: rgba(255, 255, 255, 0.1);
  --color-light-op-3: rgba(255, 255, 255, 0.05);
}

* {
  box-sizing: border-box;
}

body ::-moz-selection {
  background: var(--color-red);
  color: var(--color-light);
}

body ::selection {
  background: var(--color-red);
  color: var(--color-light);
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
  color: var(--color-light);
  line-height: 1.42857143;
}

html, body, #root {
  height: 100%;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
}

/**
 * This will hide the focus indicator if the element receives focus via the mouse,
 * but it will still show up on keyboard focus.
 */
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
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

@media screen and (max-width: 767px) {
  .hide-xs {
    display: none;
  }
}

.animation-delay-half-s {
  animation-delay: 0.5s;
}

button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}
`;

export default React.memo(GlobalStyles);
