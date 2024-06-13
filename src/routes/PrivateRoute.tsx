import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function PrivateRoute() {
  const { state } = useAuth();

  return state.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}