import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import "./css/RedditAnalysis.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const RedditAnalysis = () => {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false); // State for controlling chart visibility

  const fetchComments = async () => {
    try {
      // Make a POST request with the URL in the body
      const response = await fetch('http://localhost:8000/fetch-reddit-comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server we are sending JSON
        },
        body: JSON.stringify({ url: input }) // Send the URL in the body as a JSON object
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setPostData(data.post);  // Post data containing title, author, content, etc.
      setComments(data.comments);  // List of comments
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please check the URL and try again.");
      console.error(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchComments(); // Trigger search when Enter key is pressed
    }
  };

  const handleFocus = () => {
    // Select all text when the input is focused
    document.getElementById('reddit-url').select();
  };

  // Count positive, neutral, and negative comments
  const getSentimentCounts = () => {
    let positiveCount = 0;
    let neutralCount = 0;
    let negativeCount = 0;

    comments.forEach(comment => {
      if (comment.sentiment === 'positive') positiveCount++;
      else if (comment.sentiment === 'neutral') neutralCount++;
      else if (comment.sentiment === 'negative') negativeCount++;
    });

    return { positiveCount, neutralCount, negativeCount };
  };

  // Get sentiment counts
  const { positiveCount, neutralCount, negativeCount } = getSentimentCounts();

  // Data for the bar chart
  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: [positiveCount, neutralCount, negativeCount],
        backgroundColor: ['#28a745', '#6c757d', '#dc3545'], // Green, Grey, Red
        borderColor: ['#28a745', '#6c757d', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="reddit-analysis main-content">
      <h2><FontAwesomeIcon icon={faReddit} className="service-icon" /> Reddit Comment Analysis</h2>
      <p>Analyze the sentiment of comments on Reddit posts to better understand user opinions.</p>

      <div className="search-bar">
        <input
          id="reddit-url"
          type="text"
          placeholder="Enter Reddit post link"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}  // Handle Enter key press
          onFocus={handleFocus}        // Select all text when focused
        />
        <button onClick={fetchComments}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Display Reddit Post Data */}
      {postData && (
        <div className="post-embed">
          <h3>{postData.title}</h3>
          <p><strong>Author:</strong> {postData.author}</p>
          <p><strong>Content:</strong> {postData.content}</p>
          
          <a href={postData.url} target="_blank" rel="noopener noreferrer">View Post</a>
        </div>
      )}

      {/* Sentiment Counts */}
      {comments.length > 0 && (
        <div className="sentiment-counts">
          <h3>Sentiment Breakdown</h3>
          <p><strong>Positive:</strong> {positiveCount}</p>
          <p><strong>Neutral:</strong> {neutralCount}</p>
          <p><strong>Negative:</strong> {negativeCount}</p>
        </div>
      )}

      {/* Toggle Button for Chart */}
      {comments.length > 0 && (
        <button 
          className="toggle-chart-btn"
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      )}

      {/* Bar Chart for Sentiment Distribution */}
      {showChart && comments.length > 0 && (
        <div className="chart-container">
          <Bar data={data} />
        </div>
      )}

      {/* Display comments and sentiment analysis comments */}
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
                {/* Display sentiment label below emoji */}
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
