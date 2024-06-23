import React from 'react';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import './LayoutCommon.scss';
import { useDispatch } from 'react-redux';
import { AppRoutes } from '../routes/AppRoutes';
import { resetCurrentPage, setCurrentPage } from '../store/currentPageSlice';

export function LayoutCommon () {
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    switch (location.pathname) {
      case AppRoutes.HOME:
        dispatch(setCurrentPage(AppRoutes.HOME));
        break;
      case AppRoutes.OVERVIEW:
        dispatch(setCurrentPage(AppRoutes.OVERVIEW));
        break;
      case AppRoutes.CALENDAR:
        dispatch(setCurrentPage(AppRoutes.CALENDAR));
        break;
      case AppRoutes.TASKS:
        dispatch(setCurrentPage(AppRoutes.TASKS));
        break;
      case AppRoutes.SETTINGS:
        dispatch(setCurrentPage(AppRoutes.SETTINGS));
        break;
      default:
        dispatch(resetCurrentPage());
        break;
    }
  }, [location, dispatch]);
  
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



