import React, { useState } from 'react';
import "./css/YoutubeAnalysis.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Bar } from 'react-chartjs-2';

function YoutubeAnalysis() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [positiveCount, setPositiveCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [showChart, setShowChart] = useState(false); // State to toggle chart visibility

  const extractVideoId = (url) => {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchComments(); // Trigger search when Enter key is pressed
    }
  };

  const handleFocus = () => {
    document.getElementById("youtube-url").select(); // Select all text when input is focused
  };

  const fetchComments = async () => {
    setError("");
    setComments([]);
    setPositiveCount(0);
    setNeutralCount(0);
    setNegativeCount(0);

    const id = extractVideoId(url);
    if (!id) {
      setError("Invalid YouTube URL. Please try again.");
      return;
    }

    setVideoId(id); // Set the video ID for preview

    try {
      const response = await fetch("http://localhost:8000/fetch-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data.comments);

      // Calculate sentiment counts
      let posCount = 0;
      let neuCount = 0;
      let negCount = 0;

      data.comments.forEach((comment) => {
        if (comment.sentiment === "positive") posCount++;
        else if (comment.sentiment === "neutral") neuCount++;
        else if (comment.sentiment === "negative") negCount++;
      });

      setPositiveCount(posCount);
      setNeutralCount(neuCount);
      setNegativeCount(negCount);
    } catch (error) {
      setError("Error fetching comments. Please check the URL and try again.");
    }
  };

  // Chart Data
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
        <button onClick={fetchComments}>
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

      {/* Sentiment Counts */}
      {comments.length > 0 && (
        <div className="sentiment-counts">
          <h3>Sentiment Breakdown</h3>
          <p><strong>Positive:</strong> {positiveCount}</p>
          <p><strong>Neutral:</strong> {neutralCount}</p>
          <p><strong>Negative:</strong> {negativeCount}</p>
        </div>
      )}

      {/* Show/Hide Chart Button */}
      {comments.length > 0 && (
        <button
          className="analyze-button"
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

      {/* Display Comments */}
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
}

export default YoutubeAnalysis;

