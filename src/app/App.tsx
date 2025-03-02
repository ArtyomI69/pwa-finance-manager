import { Navigation } from '@/feautres/Navigation';
import { Suspense } from 'react';
import AppRouter from './providers/router/ui/AppRouter';

export const App = () => {
  return (
    <Suspense fallback={''}>
      <div className="flex flex-col mb-[63.2px] md:mb-0">
        <AppRouter />
      </div>
      <Navigation />
    </Suspense>
  );
};
