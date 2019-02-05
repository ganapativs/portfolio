import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../../contexts/themeContext';
import BackgroundMesh from './backgroundMesh';

const BackgroundLoader = React.memo(
  () => {
    const { theme } = useContext(ThemeContext);
    const [bgActive, mountBg] = useState(false);

    // Mount after basic animation
    useEffect(() => {
      setTimeout(() => {
        requestAnimationFrame(() => mountBg(true));
      }, 1100);
    }, []);

    return bgActive ? <BackgroundMesh theme={theme} /> : null;
  },
  () => true, // Never re-render
);

export default BackgroundLoader;
