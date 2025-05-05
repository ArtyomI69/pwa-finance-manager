import { useLocation, Navigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useUnit } from 'effector-react';
import { $session } from '@/features/Auth';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useUnit($session);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
  }

  return children;
}
