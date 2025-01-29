import React, { useState, useEffect, useContext, useCallback } from 'react';
import "./css/YoutubeAnalysis.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function YoutubeAnalysis() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]); // Store all comments initially
  const [error, setError] = useState("");
  const [positiveCount, setPositiveCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token, logout, host } = useContext(AuthContext);
  const [maxComments, setMaxComments] = useState(100);
  const navigate = useNavigate();
  const location = useLocation();

  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const fetchComments = useCallback(async (videoUrl) => {
    setLoading(true);
    setError("");
    setComments([]);
    setPositiveCount(0);
    setNeutralCount(0);
    setNegativeCount(0);

    const videoId = extractVideoId(videoUrl);
    setVideoId(videoId);

    if (!token) {
      setError("Please log in to continue.");
      logout();
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${host}/youtube/fetch-comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ video_url: videoUrl }),
      });

      if (response.status === 401) {
        setError("Session expired. Please log in again.");
        logout();
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setAllComments(data.comments); // Store all comments initially
      const filteredComments = data.comments.slice(0, maxComments);
      setComments(filteredComments);

      calculateSentimentCounts(filteredComments); // Calculate sentiment counts for filtered comments
      setLoading(false);
    } catch (error) {
      setError("Error fetching comments. Please check the URL and try again.");
      setLoading(false);
    }
  }, [token, logout, navigate, host,maxComments]);

  // Calculate sentiment counts
  const calculateSentimentCounts = (filteredComments) => {
    let posCount = 0;
    let neuCount = 0;
    let negCount = 0;

    filteredComments.forEach((comment) => {
      if (comment.sentiment === "positive") posCount++;
      else if (comment.sentiment === "neutral") neuCount++;
      else if (comment.sentiment === "negative") negCount++;
    });

    setPositiveCount(posCount);
    setNeutralCount(neuCount);
    setNegativeCount(negCount);
  };

  // Update comments dynamically when maxComments changes
  useEffect(() => {
    const filteredComments = allComments.slice(0, maxComments);
    setComments(filteredComments);
    calculateSentimentCounts(filteredComments);
  }, [maxComments, allComments]);

  useEffect(() => {
    const state = location.state;
    if (state?.videoUrl) {
      setUrl(state.videoUrl);
      fetchComments(state.videoUrl);
    }
  }, [location.state, fetchComments]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchComments(url);
    }
  };

  const handleFocus = () => {
    document.getElementById("youtube-url").select();
  };

  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Breakdown',
        data: [positiveCount, neutralCount, negativeCount],
        backgroundColor: ['#28a745', '#6c757d', '#dc3545'],
        borderColor: ['#28a745', '#6c757d', '#dc3545'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="youtube-comment-analysis">
      <h1><FontAwesomeIcon icon={faYoutube} /> YouTube Comment Analysis</h1>
      <div className="search-bar">
        <input
          id="youtube-url"
          type="text"
          placeholder="Enter YouTube video URL"
          value={url}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={() => fetchComments(url)} className="btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {videoId && (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {loading && <p>Loading comments...</p>}

      {comments.length > 0 && (
        <div className="sentiment-counts">
          <select value={maxComments} onChange={(e) => setMaxComments(Number(e.target.value))} className='select-dropdown'>
            <option value={10}>10 Comments</option>
            <option value={50}>50 Comments</option>
            <option value={100}>100 Comments</option>
          </select>
          <h3>Sentiment Breakdown</h3>
          <p><strong>Positive:</strong> {positiveCount}</p>
          <p><strong>Neutral:</strong> {neutralCount}</p>
          <p><strong>Negative:</strong> {negativeCount}</p>
        </div>
      )}

      {comments.length > 0 && (
        <button
          className="analyze-button"
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>
      )}

      {showChart && comments.length > 0 && (
        <div className="chart-container">
          <Bar data={data} />
        </div>
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
                  {` ${comment.username || "Anonymous"}`}
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
}

export default YoutubeAnalysis;
