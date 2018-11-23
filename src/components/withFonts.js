import PropTypes from 'prop-types';
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import { unstable_createResource as createResource } from 'react-cache';

const FontResource = createResource(
  FontFamilies =>
    new Promise(resolve => {
      WebFont.load({
        google: {
          families: FontFamilies.split('|').map(f => f.trim()),
        },
        // Adds `wf-active` class to html
        // use actual font when this class is applied
        active: () => resolve(true),
        // Adds `wf-inactive` class to html
        // fallback to system font when this class is applied
        inactive: () => resolve(false),
      });
    }),
);

function WithFonts(props) {
  const { FontFamilies, children } = props;

  if (!FontFamilies) {
    return children;
  }

  const fontLoaded = FontResource.read(FontFamilies);

  // Handle font loading error only once
  // Optionally add retry logic when route changes
  useEffect(() => {
    if (!fontLoaded) {
      // Report error to server with browser & network info
      console.error(`Requested fonts couldn't be loaded: ${FontFamilies}`);
    }
  }, []);

  return children;
}

WithFonts.propTypes = {
  FontFamilies: PropTypes.string,
};

WithFonts.defaultProps = {
  FontFamilies: '',
};

export default WithFonts;