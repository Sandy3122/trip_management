// PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, Component, ...rest }) => {
  return !isAuthenticated ? <Component {...rest} /> : <Navigate to="/home-page" />;
};

export default PublicRoute;