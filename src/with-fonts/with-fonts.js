import PropTypes from 'prop-types';
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import { unstable_createResource as createResource } from 'react-cache';

const FontResource = createResource(
  FontFamilies =>
    new Promise(resolve => {
      WebFont.load({
        google: {
          families: FontFamilies.split(','),
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
  const { FontFamilies } = props;
  const fontLoaded = FontResource.read(FontFamilies);

  useEffect(() => {
    if (!fontLoaded) {
      // Report error to server with browser info
      console.error(`Requested fonts couldn't be loaded: ${FontFamilies}`);
    }
  }, []);

  return props.children;
}

WithFonts.propTypes = {
  FontFamilies: PropTypes.string,
};

WithFonts.defaultProps = {
  FontFamilies: 'Lato:400,Droid Sans',
};

export default WithFonts;
