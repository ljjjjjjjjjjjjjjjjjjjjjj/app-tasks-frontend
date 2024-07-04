import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import { AppRoutes } from '../../routes/AppRoutes';

export function Home () {
    const navigate = useNavigate();

    return (
        <div className="home-container">
          <div className="header-container">
            <h1>Tasker</h1>
            <h3>Platform that helps teams collaborate better and deliver results faster.</h3>
          </div>

            <div className="features-container">
              <h3>Dashboards</h3>
              <div className="images-container">
                <img src="/images/features/current-tasks.png" alt="Current Tasks" />
                <img src="/images/features/team-progress.png" alt="Team Progress" />
              </div>
            </div>

            <div className="features-container">
              <h3>Sprints</h3>
              <div className="images-container">
                <img src="/images/features/sprint.png" alt="Sprint" />
              </div>
            </div>

            <div className="sign-up-button-container">
              <button onClick={() => navigate(AppRoutes.SIGN_UP)} className="btn btn-primary sign-up-button">
                Still not a member? SIGN-UP here!
              </button>
            </div>

        </div>
    );
};

