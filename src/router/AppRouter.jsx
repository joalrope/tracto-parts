import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './routes';
import { NotFound } from '../components/pages';

export const AppRouter = () => {
  return (
    <Switch>
      {routes.map((route) => {
        if (route.redirect) {
          return <Redirect from={route.path} to={route.pathTo} key={route.key} />;
        } else {
          return <Route path={route.path} component={route.component} key={route.key} />;
        }
      })}
      <Route component={NotFound} />;
    </Switch>
  );
};
