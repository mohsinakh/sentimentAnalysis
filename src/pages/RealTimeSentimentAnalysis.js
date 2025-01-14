import React, { useState } from 'react';
import './css/RealTimeSentimentAnalysis.css';

function RealTimeSentimentAnalysis() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setSentiment("");

    try {
      const response = await fetch("https://sentiment-analysis-api-eight.vercel.app/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment");
      }

      const data = await response.json();
      setSentiment(data.sentiment);
    } catch (error) {
      setError("Error analyzing sentiment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sentiment-page">
      <h1>Real-Time Sentiment Analysis</h1>
      <p>Enter your text below to analyze its sentiment:</p>

      <div className="input-container">
        <textarea
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="sentiment-input"
        ></textarea>
        <button onClick={handleAnalyze} className="analyze-button" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {sentiment && (
        <div className="sentiment-result">
          <p>Sentiment: <strong>{sentiment}</strong></p>
        </div>
      )}
    </div>
  );
}

export default RealTimeSentimentAnalysis;
