import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { routes } from './routes';

export const AppRouter = ({ type }) => {
  return (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.redirect) {
          return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
        } else if (prop.type === 'public') {
          return <Route path={prop.path} component={prop.component} key={key} />;
        } else if (prop.type === type) {
          return <Route path={prop.path} component={prop.component} key={key} />;
        }
        {
          prop.type === 'error' && <Route component={prop.component} />;
        }
      })}
    </Switch>
  );
};

AppRouter.propTypes = {
  type: PropTypes.string,
};
