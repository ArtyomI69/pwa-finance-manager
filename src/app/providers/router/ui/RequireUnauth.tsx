import { useLocation, Navigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useUnit } from 'effector-react';
import { $inited, $session } from '@/features/Auth';
import ThreeDotSimpleLoader from '@/shared/components/cuicui/ThreeDotSimpleLoader';

export function RequireUnauth({ children }: { children: JSX.Element }) {
  const auth = useUnit($session);
  const inited = useUnit($inited);
  const location = useLocation();

  if (!inited) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ThreeDotSimpleLoader />
      </div>
    );
  }

  if (auth) {
    return <Navigate to={RoutePath.receipts} state={{ from: location }} replace />;
  }

  return children;
}
