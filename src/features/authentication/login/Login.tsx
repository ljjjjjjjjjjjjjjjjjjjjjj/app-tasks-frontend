import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { login } from '../../../api/AuthApi';
import './Login.scss';

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
        navigate('/overview');
    } catch (error) {
        alert('Login failed');
    }
};

  return (
      <div className="login-container">
          <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <button type="submit">Login</button>
          </form>
      </div>
  );
};
