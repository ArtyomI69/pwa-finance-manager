import { Navigate, RouteProps } from 'react-router-dom';
import { QrScannerPageAsync } from '@/pages/QrScannerPage';
import { ReceiptsPageAsync } from '@/pages/ReceiptsPage';
import { ReceiptsMapAsync } from '@/pages/ReceiptsMapPage';
import { ReceiptsDashboardPageAsync } from '@/pages/ReceiptsDashboardPage';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoutes {
  SignUp = 'signup',
  SignIn = 'signin',
  Receipts = 'receipts',
  ReceiptsMap = 'receipts_map',
  ReceiptsDashboard = 'receipts_dashboard',
  Dashboard = 'dashboard',
  QR_SCANNER = 'qr_scanner',
  GROUPS = 'groups',
  Reminders = 'reminders',
  // last
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.SignUp]: '/signup',
  [AppRoutes.SignIn]: '/signin',
  [AppRoutes.Receipts]: '/receipts',
  [AppRoutes.ReceiptsMap]: '/receipts/map',
  [AppRoutes.ReceiptsDashboard]: '/receipts/dashboard',
  [AppRoutes.Dashboard]: '/dashboard',
  [AppRoutes.QR_SCANNER]: '/qr_scanner',
  [AppRoutes.GROUPS]: '/groups',
  [AppRoutes.Reminders]: '/reminders/',
  // последний
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.SignUp]: {
    path: RoutePath.signup,
    element: <ReceiptsPageAsync />,
  },
  [AppRoutes.SignIn]: {
    path: RoutePath.signin,
    element: <ReceiptsPageAsync />,
  },
  [AppRoutes.Receipts]: {
    path: RoutePath.receipts,
    element: <ReceiptsPageAsync />,
    authOnly: true,
  },
  [AppRoutes.ReceiptsMap]: {
    path: RoutePath.receipts_map,
    element: <ReceiptsMapAsync />,
    authOnly: true,
  },
  [AppRoutes.ReceiptsDashboard]: {
    path: RoutePath.receipts_dashboard,
    element: <ReceiptsDashboardPageAsync />,
    authOnly: true,
  },
  [AppRoutes.Dashboard]: {
    path: RoutePath.dashboard,
    element: <ReceiptsPageAsync />,
    authOnly: true,
  },
  [AppRoutes.QR_SCANNER]: {
    path: `${RoutePath.qr_scanner}`,
    element: <QrScannerPageAsync />,
    authOnly: true,
  },
  [AppRoutes.GROUPS]: {
    path: RoutePath.groups,
    element: <ReceiptsPageAsync />,
    authOnly: true,
  },
  [AppRoutes.Reminders]: {
    path: `${RoutePath.reminders}`,
    element: <ReceiptsPageAsync />,
    authOnly: true,
  },

  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <Navigate to={RoutePath.receipts} replace />,
  },
};
