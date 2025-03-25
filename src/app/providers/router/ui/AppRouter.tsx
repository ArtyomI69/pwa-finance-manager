import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/features/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    const element = <>{route.element}</>;

    return (
      <Route
        key={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
        path={route.path}
      />
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
};

export default memo(AppRouter);
