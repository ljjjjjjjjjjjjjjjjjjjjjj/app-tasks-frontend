import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/common/Loader';
import { AppRoutes } from './AppRoutes';

type PublicRouteProps = {
  children:ReactElement;
};

export const PublicRoute = ({ children }: PublicRouteProps): ReactElement => {
  const { state } = useAuth();
  const location = useLocation();

  if (state.loading) {
    return <Loader />;
  }

  const isPathsRestricted =  location.pathname === AppRoutes.LOGIN || location.pathname === AppRoutes.SIGN_UP;

  if (state.isAuthenticated && isPathsRestricted) {
    return <Navigate to={AppRoutes.HOME} />;
  }

  return children;
};