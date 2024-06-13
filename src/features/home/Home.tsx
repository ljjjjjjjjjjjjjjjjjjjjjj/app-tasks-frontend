import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

export function Home () {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Home Page</h1>
            <div className="button-container">
              <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
              <button className="nav-button" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
        </div>
    );
};

