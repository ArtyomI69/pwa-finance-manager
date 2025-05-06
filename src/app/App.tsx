import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navigation } from '@/widgets/Navigation';
import AppRouter from './providers/router/ui/AppRouter';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useGate } from 'effector-react';
import { AuthGate } from '@/features/Auth';

export const App = () => {
  useGate(AuthGate);

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
      <Toaster position="top-center" closeButton />
    </Suspense>
  );
};
