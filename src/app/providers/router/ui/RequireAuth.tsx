// import { getUserAuthData } from 'entities/User';
// import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

export function RequireAuth({ children }: { children: JSX.Element }) {
  // const auth = useSelector(getUserAuthData);
  const auth = true;
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath.receipts} state={{ from: location }} replace />;
  }

  return children;
}
