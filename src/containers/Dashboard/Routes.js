import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import DashboardLayout from '../Project';
import Dashboard from '../Project/Project';
import AddReport from '../AddNewReport';

const dashboardRoutes = [
  {
    path: '/dashboard',
    layout: DashboardLayout,
    component: Dashboard,
  },

  {
    path: '/add-report',
    layout: DashboardLayout,
    component: AddReport,
  },
];

const DashboardRoutes = () => {
  return (
    <Switch>
      {dashboardRoutes.map((route, i) => (
        <Route
          key={i}
          exact
          path={route.path}
          render={props => (
            <route.layout>
              <route.component {...props} />
            </route.layout>
          )}
        />
      ))}

      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default DashboardRoutes;
