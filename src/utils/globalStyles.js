import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
body {
  /*
    Accent color is set initially at gatsby-plugin-accent-color plugin
    level and handled subsequently in accentSwitcher component
  */
  --color-dark: #ecf0f3;
  --color-dark-2: #d4d8db;
  --color-ultra-dark: #fff;
  --color-light: #22252B;
  --color-light-2: #1b1e22;
  --color-ultra-light: #292c34;
  --color-light-dark: #909295;
  --color-light-op-1: rgba(0, 0, 0, 0.2);
  --color-light-op-2: rgba(0, 0, 0, 0.1);
  --color-light-op-3: rgba(0, 0, 0, 0.05);
  --color-transparent: transparent;
}

body.dark {
  --color-dark: #121111;
  --color-dark-2: #16181d;
  --color-ultra-dark: #22242b;
  --color-light: #ecf0f3;
  --color-light-2: #d4d8db;
  --color-ultra-light: #fff;
  --color-light-dark: #747475;
  --color-light-op-1: rgba(255, 255, 255, 0.2);
  --color-light-op-2: rgba(255, 255, 255, 0.1);
  --color-light-op-3: rgba(255, 255, 255, 0.05);
}

* {
  box-sizing: border-box;
}

html, body {
  font-size: 18px;
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
  /* transition: background 0.1s ease-in; */
  font-family: 'Source Sans Pro', sans-serif;
}

@media (print), (prefers-reduced-motion) {
  * {
    animation: unset !important;
    transition: none !important;
  }
}

noscript#gatsby-noscript {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  background: var(--color-light);
  color: var(--color-dark);
  padding: .5rem 1rem;
  border-radius: 2rem;
  z-index: 1;
  transform: translateX(-50%);
  min-width: 320px;
  font-size: .8rem;
  text-align: center;
}

/**
 * This will hide the focus indicator if the element receives focus via the mouse,
 * but it will still show up on keyboard focus.
 */
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;
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

/**
 * Based on copypasta from Remy Bach and Sarah Drasner
 */
code[class*='language-'],
pre[class*='language-'] {
  color: white;
  background: none;
  font-family: 'Fira Code', monospace;
  font-feature-settings: normal;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  margin-bottom: 0;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}

p code[class*='language-'],
p pre[class*='language-'] {
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 0 1px var(--color-accent);
}

/* Code blocks */
pre[class*='language-'] {
  overflow: auto;
  padding: 1.3125rem;
}

pre[class*='language-']::-moz-selection {
  /* Firefox */
  background: hsl(207, 4%, 16%);
}

pre[class*='language-']::selection {
  /* Safari */
  background: hsl(207, 4%, 16%);
}

/* Text Selection colour */
pre[class*='language-']::-moz-selection,
pre[class*='language-'] ::-moz-selection {
  text-shadow: none;
  background: hsla(0, 0%, 100%, 0.15);
}

pre[class*='language-']::selection,
pre[class*='language-'] ::selection {
  text-shadow: none;
  background: hsla(0, 0%, 100%, 0.15);
}

/* Inline code */
:not(pre) > code[class*='language-'] {
  border-radius: 2px;
  background: var(--color-light-op-3);
  color: var(--color-light);
  padding: 0.1em 0;
  white-space: normal;
  margin: 0 0.15em 0 0;
  box-shadow: 0 0 1px var(--color-accent);
}

.token.attr-name {
  color: rgb(173, 219, 103);
  font-style: italic;
}

.token.comment {
  color: rgb(128, 147, 147);
}

.token.string,
.token.url {
  color: rgb(173, 219, 103);
}

.token.variable {
  color: rgb(214, 222, 235);
}

.token.number {
  color: rgb(247, 140, 108);
}

.token.builtin,
.token.char,
.token.constant,
.token.function {
  color: rgb(130, 170, 255);
}

.token.punctuation {
  color: rgb(199, 146, 234);
}

.token.selector,
.token.doctype {
  color: rgb(199, 146, 234);
  font-style: 'italic';
}

.token.class-name {
  color: rgb(255, 203, 139);
}

.token.tag,
.token.operator,
.token.keyword {
  color: #F06292;
}

.token.boolean {
  color: rgb(255, 88, 116);
}

.token.property {
  color: rgb(128, 203, 196);
}

.token.namespace {
  color: rgb(178, 204, 214);
}

pre[data-line] {
  padding: 1em 0 1em 3em;
  position: relative;
}

.gatsby-highlight-code-line {
  background-color: hsla(207, 95%, 15%, 1);
  display: block;
  margin-right: -1.3125rem;
  margin-left: -1.3125rem;
  padding-right: 1em;
  padding-left: 1.25em;
  border-left: 0.25em solid var(--color-accent);
}

.gatsby-highlight {
  margin-bottom: 1.75rem;
  margin-left: -1.3125rem;
  margin-right: -1.3125rem;
  background: linear-gradient(45deg, #210037, #050512);
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  border-radius: 1rem;
}

@media screen and (max-width: 767px) {
  .gatsby-highlight {
    margin-left: -1.11rem;
    margin-right: -1.11rem;
    border-radius: 0;
  }
}

.gatsby-highlight pre[class*='language-'] {
  float: left;
  min-width: 100%;
}

/* Plugin style overrides */
.twitter-tweet {
  margin-left: auto;
  margin-right: auto;
}

::view-transition-new(root) {
  animation: reveal .25s linear;
  clip-path: inset(0 0 0 0);
  z-index: 2;
}
::view-transition-old(root) {
  z-index: -1;
  animation: none;
}

// View transition animation triggered using document.startViewTransition
[data-theme="dark"] {
  --from: 0 0 100% 0;
}

[data-theme="light"] {
  --from: 100% 0 0 0;
}

@keyframes reveal {
  from {
    clip-path: inset(var(--from, 0 0 100% 0));
  }
}
`;

export default React.memo(GlobalStyles);
