import React, { lazy, Suspense } from 'react';

const LazyPieChart = lazy(() => import('./PieChart'));

const PieChart = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPieChart {...props} />
  </Suspense>
);

export default PieChart;
