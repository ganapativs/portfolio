import React, { Suspense } from 'react';

const BackgroundMesh = React.lazy(() => import('./backgroundMesh'));

const BackgroundLoader = React.memo(
  () => {
    return (
      <Suspense fallback={null}>
        <BackgroundMesh />
      </Suspense>
    );
  },
  () => true, // Never re-render
);

export default BackgroundLoader;
