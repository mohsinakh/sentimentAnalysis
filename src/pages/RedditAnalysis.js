import React, { useContext, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import "./css/RedditAnalysis.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RedditAnalysis = () => {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([]);
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const location = useLocation();

  const { token, logout,host } = useContext(AuthContext);

  // Fetch comments data from the API
  const fetchComments = async (urlToAnalyze) => {
    if (!token) {
      setError("Please log in to continue.");
      logout();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${host}/reddit/fetch-comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ post_url: urlToAnalyze })
      });

      if (response.status === 401) {
        setError("Session expired. Please log in again.");
        // logout();
        return;
      }

      if (response.status === 404) {
        setError("Reddit post not found. Please check the URL.");
        return;
      }

      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();

      if (data.message === "Analysis already exists") {
        setPostData(data.analysis_data.post);
        setComments(data.analysis_data.comments || []);
      } else {
        setPostData(data.post);
        setComments(data.comments || []);
      }
    } catch (err) {
      setError("Failed to fetch data. Please check the URL and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch Reddit data if navigated with a URL
  useEffect(() => {
    const stateUrl = location.state?.postId; // Extract Reddit URL from navigation state
    if (stateUrl) {
      setInput(stateUrl); // Update input field for UI
      fetchComments(stateUrl); // Fetch data automatically
    }
    // eslint-disable-next-line
  }, [location.state]);

  // Handle Enter key press to trigger fetchComments
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchComments(input);
    }
  };

  // Handle input focus to select text
  const handleFocus = () => document.getElementById('reddit-url').select();

  // Process sentiment counts
  const getSentimentCounts = () => {
    let positiveCount = 0, neutralCount = 0, negativeCount = 0;
    if (comments.length) {
      comments.forEach(comment => {
        if (comment.sentiment === 'positive') positiveCount++;
        else if (comment.sentiment === 'neutral') neutralCount++;
        else if (comment.sentiment === 'negative') negativeCount++;
      });
    }
    return { positiveCount, neutralCount, negativeCount };
  };

  const { positiveCount, neutralCount, negativeCount } = getSentimentCounts();

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
        <button onClick={() => fetchComments(input)} disabled={loading} className='btn'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {loading && <Loading/>}

      {postData && (
        <div className="post-embed">
          <h3>{postData.title}</h3>
          <p><strong>Author:</strong> {postData.author || "Author not available"}</p>
          <p><strong>Content:</strong> {postData.content || "No content available"}</p>
          <a href={postData.url} target="_blank" rel="noreferrer" className="view-post-link">
            View Post
          </a>
          {postData.url && postData.url.match(/\.(jpeg|jpg|gif|png)$/) && (
            <img src={postData.url} alt="Reddit post" className="reddit-image" />
          )}
        </div>
      )}

      {comments.length > 0 && (
        <>
          <div className="sentiment-counts">
            <h3>Sentiment Breakdown</h3>
            <p><strong>Positive:</strong> {positiveCount}</p>
            <p><strong>Neutral:</strong> {neutralCount}</p>
            <p><strong>Negative:</strong> {negativeCount}</p>
          </div>
          <button className="toggle-chart-btn" onClick={() => setShowChart(!showChart)}>
            {showChart ? "Hide Chart" : "Show Chart"}
          </button>
          {showChart && (
            <div className="chart-container">
              <Bar data={data} />
            </div>
          )}
        </>
      )}

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
                  {comment.sentiment}
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
