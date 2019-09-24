// eslint-disable-next-line import/no-extraneous-dependencies
const React = require('react');

exports.onRenderBody = function accentColor({ setPreBodyComponents }) {
  setPreBodyComponents([
    React.createElement('script', {
      key: 'gatsby-plugin-accent-color',
      dangerouslySetInnerHTML: {
        __html: `
void function() {
  window.__onAccentColorChange = function() {}

  var preferredAccentColor
  try {
    preferredAccentColor = localStorage.getItem('accentColor')
  } catch (err) { }

  function setAccentColor(accentColor) {
    window.__accentColor = accentColor
    preferredAccentColor = accentColor
    window.__onAccentColorChange(accentColor)
  }

  window.__setPreferredAccentColor = function(accentColor) {
    setAccentColor(accentColor)
    try {
      localStorage.setItem('accentColor', accentColor)
    } catch (err) {}
  }

  setAccentColor(preferredAccentColor)
}()
    `,
      },
    }),
  ]);
};
