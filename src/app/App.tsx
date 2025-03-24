import { Navigation } from '@/feautres/Navigation';
import { Suspense } from 'react';
import AppRouter from './providers/router/ui/AppRouter';
import { ColorActivator } from '@/shared/components/ui/ColorActivator';

export const App = () => {
  return (
    <Suspense fallback={''}>
      <div className="min-h-[calc(100vh-63.2px)] md:min-h-screen flex flex-col">
        <AppRouter />
      </div>
      <Navigation />
      <ColorActivator />
    </Suspense>
  );
};
