import React, { lazy, Suspense } from 'react';

const LazyPlantDetails = lazy(() => import('./PlantDetails'));

const PlantDetails = props => (
  <Suspense fallback={null}>
    <LazyPlantDetails {...props} />
  </Suspense>
);

export default PlantDetails;
