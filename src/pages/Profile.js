import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './css/Profile.css'; // Importing the CSS file
import { faEnvelope, faSmile, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useToast } from '../context/ToastContext'; // Importing toast context
import Loading from './Loading'; // Import the Loading component

const Profile = () => {
  const { token,host } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true); // State for tracking loading status of history
  const navigate = useNavigate();
  const { showToast } = useToast(); 
  

  const fetchHistory = useCallback(async (username) => {
    if(token){
    try {
      const response = await fetch(`${host}/analysis-history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setLoadingHistory(false);
        return;
      }

      const data = await response.json();
      setHistory(data.history || []);
      setLoadingHistory(false); // Set loadingHistory to false once data is fetched

      showToast('Analysis history loaded successfully!', 'success');
    } catch (error) {
      console.error('Error fetching analysis history:', error);
      setLoadingHistory(false); // Ensure loading is stopped even in case of error
      showToast('An error occurred while loading the history.', 'error');
    }
  }
    // eslint-disable-next-line
  }, [token ]);

  useEffect(() => {
    const fetchedUser = JSON.parse(localStorage.getItem('user')) || null;
    if (fetchedUser) {
      setUser(fetchedUser);
      fetchHistory(fetchedUser.username);
    }
  }, [fetchHistory]);

  const sentimentHistory = history.filter(item => item.analysis_type === 'sentiment');
  const youtubeHistory = history.filter(item => item.analysis_type === 'youtube');
  const redditHistory = history.filter(item => item.analysis_type === 'reddit');

  // Handle re-analysis for individual items
  const handleReanalyzeSentiment = (item) => {
    showToast('Re-analyzing sentiment...', 'info');
    navigate('/realtime-sentiment-analysis', { state: { analysisData: item.analysis_data.text } });
  };

  const handleReanalyzeYouTube = (item) => {
    showToast('Re-analyzing YouTube video...', 'info'); 
    navigate('/youtube-analysis', { state: { videoUrl: `https://youtu.be/${item.analysis_data.video_id}`} });
  };

  const handleReanalyzeReddit = (item) => {
    showToast('Re-analyzing Reddit post...', 'info');
    navigate('/reddit-analysis', { state:  { postId:`https://reddit/comments/${item.analysis_data.post_id}` } });
  };
 
  return (
    <div className="profile-page">
      <h2 className="profile-header">Profile Page</h2>
      {user ? (
        <div className="profile-details">
          <p><FontAwesomeIcon icon={faUser} /><strong> Username:</strong> {user.username }</p>
          <p><FontAwesomeIcon icon={faEnvelope} /><strong> Email:</strong> {user.email}</p>

          <div className="history-section">
            <h3>Analysis History</h3>
            {loadingHistory ? (
              <Loading /> // Show loading spinner while history is being fetched
            ) : (
              <div className="history-category-container">
                {sentimentHistory.length > 0 && (
                  <div className="history-category sentiment">
                    <h4><FontAwesomeIcon icon={faSmile} /> Sentiment Analysis</h4>
                    <div className="analysis-content">
                      {sentimentHistory.map((item, index) => (
                        <div key={index} className="history-item">
                          <p><strong>Date:</strong> {new Date(item.timestamp).toLocaleString()}</p>
                          <p><strong>Text:</strong> {item.analysis_data.text}</p>
                          <p><strong>Sentiment:</strong> {item.analysis_data.sentiment}</p>
                          <button onClick={() => handleReanalyzeSentiment(item)} className='profile-btn'>Re-analyze Sentiment</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {youtubeHistory.length > 0 && (
                  <div className="history-category youtube">
                    <h4><FontAwesomeIcon icon={faYoutube} /> YouTube Analysis</h4>
                    <div className="analysis-content">
                      {youtubeHistory.map((item, index) => (
                        <div key={index} className="history-item">
                          <p><strong>Date:</strong> {new Date(item.timestamp).toLocaleString()}</p>
                          <p><strong>Video URL:</strong> <a href={`https://www.youtube.com/embed/${item.analysis_data.video_id}`} target='_blank' rel='noreferrer' className='profile_link'>View Video</a></p>
                          <p><strong>Video Title:</strong> {item.analysis_data.title}</p>
                          <p><strong>Comments:</strong> {item.analysis_data.comments.length} comments</p>
                          <div className="youtube-video">
                            <iframe
                              width="100%"
                              height="315"
                              src={`https://www.youtube.com/embed/${item.analysis_data.video_id}`}
                              frameBorder="0"
                              allowFullScreen
                              title={item.analysis_data.title}
                            ></iframe>
                          </div>
                          <button onClick={() => handleReanalyzeYouTube(item)} className='profile-btn'>Re-analyze YouTube</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {redditHistory.length > 0 && (
                  <div className="history-category reddit">
                    <h4><FontAwesomeIcon icon={faReddit} /> Reddit Analysis</h4>
                    <div className="analysis-content">
                      {redditHistory.map((item, index) => (
                        <div key={index} className="history-item">
                          <p><strong>Date:</strong> {new Date(item.timestamp).toLocaleString()}</p>
                          <p><strong>Post URL:</strong> <a href={item.analysis_data.post.url} target='_blank' rel='noreferrer' className='profile_link'>View Post</a></p>
                          <p><strong>Subreddit:</strong> {item.analysis_data.subreddit || "No Subreddit Data"}</p>
                          <p><strong>Comments:</strong> {item.analysis_data.comments.length} comments</p>
                          <div className="reddit-post">
                            {item.analysis_data.post.url ? (
                              item.analysis_data.post.url.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img
                                  src={item.analysis_data.post.url}
                                  alt="Reddit post"
                                  className="reddit-image"
                                />
                              ) : null
                            ) : null}
                          </div>
                          <button onClick={() => handleReanalyzeReddit(item)} className='profile-btn'>Re-analyze Reddit</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {history.length === 0 && !loadingHistory && <p className="no-history">No analysis history found.</p>}
          </div>
        </div>
      ) : (
        <p><Loading/></p>
      )}
    </div>
  );
};

export default Profile;
