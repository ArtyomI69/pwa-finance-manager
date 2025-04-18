import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from '@/widgets/Navigation';
import AppRouter from './providers/router/ui/AppRouter';
import { ColorActivator } from '@/shared/components/ui/ColorActivator';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

export const App = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname.includes(RoutePath.register);
  const isLoginPage = location.pathname.includes(RoutePath.login);
  const isAuthPage = isRegisterPage || isLoginPage;

  return (
    <Suspense fallback={''}>
      <div className="min-h-[calc(100vh-63.2px)] md:min-h-screen flex flex-col">
        <AppRouter />
      </div>
      {!isAuthPage && <Navigation />}
      <ColorActivator />
    </Suspense>
  );
};
