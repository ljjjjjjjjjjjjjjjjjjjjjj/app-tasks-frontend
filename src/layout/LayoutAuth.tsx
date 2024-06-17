import React from 'react';
import { Outlet } from 'react-router-dom';
import './LayoutAuth.scss';
import { HeaderAuth } from '../components/header/HeaderAuth';

export function LayoutAuth() {
  
  return (
    <div className="layout-auth-container">
        <HeaderAuth />
      <div className="layout-auth">
        <Outlet />
      </div>
    </div>
  );
}
