import React, { Suspense, useContext } from 'react';
import ThemeContext from '../../contexts/themeContext';

const BackgroundMesh = React.lazy(() => import('./backgroundMesh'));

const BackgroundLoader = React.memo(
  () => {
    const { theme } = useContext(ThemeContext);

    return (
      <Suspense fallback={null}>
        <BackgroundMesh theme={theme} />
      </Suspense>
    );
  },
  () => true, // Never re-render
);

export default BackgroundLoader;
