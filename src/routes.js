import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import DashboardView from 'src/views/reports/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import StocksListView from 'src/views/stocks/StocksListView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
    
      { path: 'dashboard', element: <DashboardView /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'stocks', element: <StocksListView /> },
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
