import { Navigation } from '@/feautres/Navigation';
import { Suspense } from 'react';
import AppRouter from './providers/router/ui/AppRouter';

export const App = () => {
  return (
    <Suspense fallback={''}>
      <Navigation />
      <AppRouter />
    </Suspense>
  );
};
