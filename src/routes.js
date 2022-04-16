import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import DashboardView from 'src/views/reports/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import StocksChartView from 'src/views/stocks/StocksChartView';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import HistorysView from 'src/views/historys/HistorysView';
import CoinsView from 'src/views/coins/CoinsView';
import DividendsView from 'src/views/dividends/DividendsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardView /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'charts', element: <StocksChartView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'historys', element: <HistorysView /> },
      { path: 'coins', element: <CoinsView /> },
      { path: 'dividends', element: <DividendsView /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
