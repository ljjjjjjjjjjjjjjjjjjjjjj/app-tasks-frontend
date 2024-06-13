import React from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import './LayoutCommon.scss';

export function LayoutCommon () {
  
  return (
    <div className="layout-common">
      <div className="header">
        <Header />
      </div>

      <div className="main-content">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>

      <div className="footer">
      <Footer />
      </div>

    </div>
  );
}



