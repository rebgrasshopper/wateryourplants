import React, { lazy, Suspense } from 'react';

const LazyGardenList = lazy(() => import('./GardenList'));

const GardenList = props => (
  <Suspense fallback={null}>
    <LazyGardenList {...props} />
  </Suspense>
);

export default GardenList;
