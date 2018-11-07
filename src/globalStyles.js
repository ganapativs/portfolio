import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyles = createGlobalStyle`
:root {
  --color-dark: ${props => (props.theme === 'dark' ? '#181819' : '#f0f3f9')};
  --color-dark-light: #313030;
  --color-light: ${props => (props.theme === 'dark' ? '#f0f3f9' : '#181819')};
  --color-light-op-1: rgba(255, 255, 255, 0.2);
  --color-light-op-2: rgba(255, 255, 255, 0.1);
  --color-light-op-3: rgba(255, 255, 255, 0.05);
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

.txt-center {
  text-align: center;
}

.txt-left {
  text-align: left;
}

.txt-right {
  text-align: right;
}

.disp-i-block {
  display: inline-block;
}

.pad {
  padding: 10px;
}

.pad-left {
  padding-left: 10px;
}

.pad-right {
  padding-right: 10px;
}

.pad-top {
  padding-top: 10px;
}

.pad-bottom {
  padding-bottom: 10px;
}

.mar {
  margin: 10px;
}

.mar-left {
  margin-left: 10px;
}

.mar-right {
  margin-right: 10px;
}

.mar-top {
  margin-top: 10px;
}

.mar-bottom {
  margin-bottom: 10px;
}
`;

export default React.memo(GlobalStyles);
