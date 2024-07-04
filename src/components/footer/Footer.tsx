import React from 'react';
import './Footer.scss';

export function Footer() {
 
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Tasker. All rights reserved.</p>
    </footer>
  );
}
