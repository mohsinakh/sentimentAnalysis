import React from "react";
import "./css/Home.css"; // Import the custom CSS
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; 



const Home = () => {
  return (
    <div className="home-container">
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-items">
          <Link to="/RealTimeSentimentAnalysis" className="service-link">
            <div className="service-item">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="service-icon"
                style={{ color: "#E53935" }}
              />
              <h3>Real-Time Sentiment Analysis</h3>
              <p>
                Gain instant insights on how your audience feels in real-time.
              </p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </Link>

          <Link to="/RedditAnalysis" className="service-link">
            <div className="service-item">
              <FontAwesomeIcon
                icon={faReddit}
                className="service-icon"
                style={{ color: "#E1306C" }}
              />
              <h3>Reddit Comment Analysis</h3>
              <p>
                Analyze comments on your Reddit posts for deep audience
                insights.
              </p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </Link>

          <Link to="/YouTubeAnalysis" className="service-link">
            <div className="service-item">
              <FontAwesomeIcon
                icon={faYoutube}
                className="service-icon"
                style={{ color: "red" }}
              />
              <h3>YouTube Comment Analysis</h3>
              <p>
                Understand viewer feedback and engagement on your YouTube
                videos.
              </p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </Link>
        </div>
        <button className="contact-button">Contact Us</button>
      </section>

    </div>
  );
};

export default Home;
