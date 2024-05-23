import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const Home: React.FC = () => {
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

export default Home;