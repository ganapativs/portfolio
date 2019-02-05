import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './assets/animate-custom.css';
import AppWithTheme from './appWithTheme';
import * as serviceWorker from './serviceWorker';
/**
 * Show outline only on keyboard interaction
 *
 * Adds 'js-focus-visible' class to body and 'focus-visible' class to focused element
 *
 * https://github.com/WICG/focus-visible
 * https://davidwalsh.name/css-focus
 */
import 'focus-visible';

ReactDOM.createRoot(document.getElementById('root')).render(
  // styled component has issues with StrictMode like findDOMNode etc
  // But ReactDOM.createRoot uses StrictMode enabled by default
  <AppWithTheme />,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
