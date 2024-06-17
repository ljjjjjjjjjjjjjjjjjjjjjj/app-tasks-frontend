import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/AppRoutes';
import './Sidebar.scss';


export function Sidebar() {
  const navigate = useNavigate();
  
  return (
    <div className="sidebar">
      
      <button onClick={() => navigate(AppRoutes.HOME)} className="btn btn-primary">Home</button>
      <button onClick={() => navigate(AppRoutes.TASKS)} className="btn btn-primary">Tasks</button>
      <button onClick={() => navigate(AppRoutes.CALENDAR)} className="btn btn-primary">Calendar</button>
      <button onClick={() => navigate(AppRoutes.SETTINGS)} className="btn btn-primary">Settings</button>

    </div>
  );
}
