import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';

export function SignUp () {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
      e.preventDefault();

      const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
          navigate('/login');
      } else {
          alert('Signup failed');
      }
  };

  return (
      <div className="signup-container">
          <form onSubmit={handleSignup}>
              <h1>Sign Up</h1>
              <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
              />
              <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
              />
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
              <button type="submit">Sign Up</button>
          </form>
      </div>
  );
};
