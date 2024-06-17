import React from 'react';
import { Spinner } from './Spinner';

export function Loader() {
  return (
    <div className="loading-screen">
      <Spinner />
    </div>
  );
}