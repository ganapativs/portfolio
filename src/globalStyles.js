import React from 'react';
import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyles = createGlobalStyle`
:root {
  --color-dark: ${props => props.theme.dark};
  --color-light: ${props => props.theme.light};
  --color-light-dark: ${props => props.theme.lightDark};
  --color-light-op-1: ${props => props.theme.lightOp1};
  --color-light-op-2: ${props => props.theme.lightOp2};
  --color-light-op-3: ${props => props.theme.lightOp3};
  --color-blue: ${props => props.theme.blue};
  --color-orange: ${props => props.theme.orange};
  --color-red: ${props => props.theme.red};
  --color-transparent: ${props => props.theme.transparent};
}

* {
  box-sizing: border-box;
}

::-moz-selection {
  background: var(--color-red);
  color: var(--color-light);
}

::selection {
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
  line-height: 1.42857143;
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
