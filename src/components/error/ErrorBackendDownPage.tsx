import React from 'react';
import './ErrorPage.scss';

export function ErrorBackendDownPage () {
  return (
    <div className="error-page">
      <div className="error-title">
        <h1>Error</h1>
        <h3>Something went wrong</h3>
      </div>

      <div className="error-content">
        <p>We are having trouble connecting to our servers.<br />Please try again later.</p>
      </div>
    </div>
  );
};