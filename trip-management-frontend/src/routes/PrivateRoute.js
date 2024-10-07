// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, Component, ...rest }) => {
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/sign-up" />;
};

export default PrivateRoute;