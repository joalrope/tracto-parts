import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ isAuthenticated, component: Component, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => (isAuthenticated ? <Redirect to={redirectTo} /> : <Component {...props} />)}
    />
  );
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
