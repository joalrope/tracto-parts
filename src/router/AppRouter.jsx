import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './routes';
import { NotFound } from '../components/pages';

export const AppRouter = () => {
  const { header, sider, submenu } = routes;
  const sub = header.concat(sider);
  const allRoutes = sub.concat(submenu);
  return (
    <Switch>
      {allRoutes.map((prop, key) => {
        if (prop.redirect) {
          console.log(prop);
          return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
        } else {
          return <Route path={prop.path} component={prop.component} key={key} />;
        }
      })}
      <Route component={NotFound} />;
    </Switch>
  );
};
