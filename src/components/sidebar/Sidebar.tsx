import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/AppRoutes';
import './Sidebar.scss';


export function Sidebar() {
  const navigate = useNavigate();
  
  return (
    <div className="sidebar">

      <p>Sidebar</p>

      <button onClick={() => navigate(AppRoutes.TASKS)} className="nav-btn">Tasks</button>
      <button onClick={() => navigate(AppRoutes.CALENDAR)} className="nav-btn">Calendar</button>
      <button onClick={() => navigate(AppRoutes.SETTINGS)} className="nav-btn">Settings</button>

    </div>
  );
}
