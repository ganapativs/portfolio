const React = require('react');
const Layout = require('./src/components/layout').default;

// IntersectionObserver polyfill for gatsby-image (Safari, IE)
if (typeof window.IntersectionObserver === 'undefined') {
  import('intersection-observer');
}

exports.wrapPageElement = function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
};
