import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import "./css/RedditAnalysis.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for the chart
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RedditAnalysis = () => {
  // State variables
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false);

  // Fetch Reddit comments and post data
  const fetchComments = async () => {
    try {
      const response = await fetch('https://sentiment-analysis-api-eight.vercel.app/fetch-reddit-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input })
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setPostData(data.post);
      setComments(data.comments);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please check the URL and try again.");
      console.error(err);
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchComments();
  };

  // Automatically select input content on focus
  const handleFocus = () => document.getElementById('reddit-url').select();

  // Calculate sentiment counts
  const getSentimentCounts = () => {
    let positiveCount = 0, neutralCount = 0, negativeCount = 0;
    comments.forEach(comment => {
      if (comment.sentiment === 'positive') positiveCount++;
      else if (comment.sentiment === 'neutral') neutralCount++;
      else if (comment.sentiment === 'negative') negativeCount++;
    });
    return { positiveCount, neutralCount, negativeCount };
  };

  // Sentiment count values
  const { positiveCount, neutralCount, negativeCount } = getSentimentCounts();

  // Bar chart data
  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: [positiveCount, neutralCount, negativeCount],
        backgroundColor: ['#28a745', '#6c757d', '#dc3545'],
        borderColor: ['#28a745', '#6c757d', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="reddit-analysis main-content">
      <h2><FontAwesomeIcon icon={faReddit} className="service-icon" /> Reddit Comment Analysis</h2>
      <p>Analyze the sentiment of comments on Reddit posts to better understand user opinions.</p>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          id="reddit-url"
          type="text"
          placeholder="Enter Reddit post link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
        />
        <button onClick={fetchComments}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Post Information */}
      {postData && (
        <div className="post-embed">
          <h3>{postData.title}</h3>
          <p><strong>Author:</strong> {postData.author}</p>
          <p><strong>Content:</strong> {postData.content}</p>
          <a href={postData.url} target="_blank" rel="noopener noreferrer">View Post</a>
        </div>
      )}

      {/* Sentiment Breakdown */}
      {comments.length > 0 && (
        <div className="sentiment-counts">
          <h3>Sentiment Breakdown</h3>
          <p><strong>Positive:</strong> {positiveCount}</p>
          <p><strong>Neutral:</strong> {neutralCount}</p>
          <p><strong>Negative:</strong> {negativeCount}</p>
        </div>
      )}

      {/* Toggle Chart Button */}
      {comments.length > 0 && (
        <button className="toggle-chart-btn" onClick={() => setShowChart(!showChart)}>
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      )}

      {/* Bar Chart */}
      {showChart && comments.length > 0 && (
        <div className="chart-container">
          <Bar data={data} />
        </div>
      )}

      {/* Comments Section */}
      {comments.length > 0 && (
        <div className="comments">
          <h2>Comments</h2>
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="comment-card">
                <h4>
                  {comment.sentiment === "positive" && "😊"}
                  {comment.sentiment === "neutral" && "😐"}
                  {comment.sentiment === "negative" && "😠"}
                  {` ${comment.user || "Anonymous"}`}
                </h4>
                <div className={`sentiment-label ${comment.sentiment}`}>
                  {comment.sentiment === "positive" && "pos"}
                  {comment.sentiment === "neutral" && "neu"}
                  {comment.sentiment === "negative" && "neg"}
                </div>
                <p>{comment.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RedditAnalysis;
