import { useLocation, Navigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useUnit } from 'effector-react';
import { $inited, $session } from '@/features/Auth';
import ThreeDotSimpleLoader from '@/shared/components/cuicui/ThreeDotSimpleLoader';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useUnit($session);
  const inited = useUnit($inited);
  const location = useLocation();

  if (!inited) {
    return <ThreeDotSimpleLoader />;
  }

  if (!auth) {
    return <Navigate to={RoutePath.login} state={{ from: location }} replace />;
  }

  return children;
}
