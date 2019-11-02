// eslint-disable-next-line import/no-extraneous-dependencies
const React = require('react');

exports.onRenderBody = function accentColor(
  { setPreBodyComponents },
  { defaultAccentColor } = {},
) {
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

  setAccentColor(preferredAccentColor || '${defaultAccentColor}')

  // Add accent color variable to body initially to avoid color flicker
  var css = 'body { --color-accent: ' + preferredAccentColor + ' }',
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
}()
    `,
      },
    }),
  ]);
};
