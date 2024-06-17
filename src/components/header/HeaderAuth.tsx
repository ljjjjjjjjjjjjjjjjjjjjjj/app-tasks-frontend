import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/AppRoutes';

import './HeaderAuth.scss'; 

export function HeaderAuth() {
  const navigate = useNavigate();

  return (
    <div className="header-inner-auth">
      <button onClick={() => navigate(AppRoutes.HOME)} className="btn btn-primary">
        Back to the Home page
      </button>
    </div>
  );
  
}
