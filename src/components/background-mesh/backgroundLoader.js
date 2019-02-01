import React, { Suspense, useContext, useState, useEffect } from 'react';
import ThemeContext from '../../contexts/themeContext';

const BackgroundMesh = React.lazy(() => import('./backgroundMesh'));

const BackgroundLoader = React.memo(
  () => {
    const { theme } = useContext(ThemeContext);
    const [bgActive, mountBg] = useState(false);

    // Mount after basic animation
    useEffect(() => {
      setTimeout(() => {
        requestAnimationFrame(() => mountBg(true));
      }, 800);
    }, []);

    return bgActive ? (
      <Suspense fallback={null}>
        <BackgroundMesh theme={theme} />
      </Suspense>
    ) : null;
  },
  () => true, // Never re-render
);

export default BackgroundLoader;
