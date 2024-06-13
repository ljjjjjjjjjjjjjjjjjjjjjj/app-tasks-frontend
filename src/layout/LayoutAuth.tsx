import React from 'react';
import { Outlet } from 'react-router-dom';

export function LayoutAuth() {
  
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Outlet />
    </div>
  );
}
