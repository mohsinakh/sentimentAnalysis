import React from 'react';
import './css/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
