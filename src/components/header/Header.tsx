import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.scss';
import { AppRoutes } from '../../routes/AppRoutes';


export function Header() {
  const { state, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout();
    navigate(AppRoutes.HOME);
  };

  const getTruncatedName = () => {
    if (state.user != null){
    const fullName = `${state.user.firstName} ${state.user.lastName}`;
    const maxLength = 30; 
    if (fullName.length > maxLength) {
      return `${fullName.substring(0, maxLength)}...`;
    }
    return fullName;}
  };

  return (
    <div className="header-inner">

      <div className="company-logo-container">
        <img src="/images/company-logo.jpg" alt="Company Logo" className="company-logo" />
      </div>

      <div className="user-info-container">
        {state.user ? (
          <button onClick={handleSignOut} className="btn btn-primary btn-auth">
            <span className="user-name">{getTruncatedName()}</span> | Sign out
          </button>
        ) : (
          <button onClick={() => navigate(AppRoutes.LOGIN)} className="btn btn-primary btn-auth">
            Login | Sign up
          </button>
        )}
      </div>
    </div>
  );
  
}

