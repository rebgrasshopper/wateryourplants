import React, { lazy, Suspense } from 'react';

const LazyPlantCard = lazy(() => import('./PlantCard'));

const PlantCard = props => (
  <Suspense fallback={null}>
    <LazyPlantCard {...props} />
  </Suspense>
);

export default PlantCard;
