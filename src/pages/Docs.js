import React from 'react';
import "./css/Docs.css"; // Import the custom CSS for Docs page (if you have one)

const Docs = () => {
  return (
    <div className="docs-container">
      <h1>Documentation</h1>
      <p>Welcome to the documentation page! Here you can find resources and instructions on how to use the platform.</p>

      <h2>Getting Started</h2>
      <p>To get started, simply follow the steps outlined below:</p>
      <ul>
        <li>Sign up for an account.</li>
        <li>Choose the service you want to analyze (YouTube, Reddit, or Real-Time Sentiment).</li>
        <li>Start analyzing and gain valuable insights from your data.</li>
      </ul>

      <h2>Features</h2>
      <p>Our platform offers a variety of features including:</p>
      <ul>
        <li>Sentiment analysis for YouTube comments.</li>
        <li>Reddit comment analysis for better audience insights.</li>
        <li>Real-time sentiment tracking.</li>
      </ul>
    </div>
  );
}

export default Docs;
