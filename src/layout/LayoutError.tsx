import React from 'react';
import { Outlet } from 'react-router-dom';
import './LayoutError.scss';

export function LayoutError() {
  
  return (
    <div className="layout-error">
        <Outlet />
    </div>
  );
}
