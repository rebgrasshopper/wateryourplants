import React, { lazy, Suspense } from 'react';

const LazyGardenDetail = lazy(() => import('./GardenDetail'));

const GardenDetail = props => (
  <Suspense fallback={null}>
    <LazyGardenDetail {...props} />
  </Suspense>
);

export default GardenDetail;
