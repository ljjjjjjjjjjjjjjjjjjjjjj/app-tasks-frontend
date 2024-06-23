import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { login } from '../../../api/AuthApi';
import './Login.scss';
import { AppRoutes } from '../../../routes/AppRoutes';

export function Login () {
  const navigate = useNavigate();
  const { dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const data = await login(email, password);
        dispatch({ type: 'LOGIN', token: data.jwt, user: data.user });
        navigate(AppRoutes.OVERVIEW);
    } catch (error) {
        alert('Login failed');
    }
};

  return (
      <div className="auth-container">
          <form onSubmit={handleLogin} className="auth-form">
              <h1 className="auth-title">Login</h1>

              <label className="auth-label" htmlFor="email">
                Username
              </label>
              <div className="auth-input-container">
                <input
                  type="email"
                  id="email"
                  placeholder="Type your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>

              <label className="auth-label" htmlFor="password">
                Password
              </label>
              <div className="auth-input-container">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="auth-input"
                />
              </div>

              <button type="submit" className="auth-submit-button">
                Login
              </button>

              <div className="auth-forgot">
                <a href="/forgot-password">Forgot password?</a>
              </div>

              <div className="auth-links">
                <span>Don't have an account?</span>
                <a href="/signup" className="auth-link">Sign Up</a>
              </div>

          </form>
      </div>
  );
};
