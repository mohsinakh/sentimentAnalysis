import React from "react";
import "./css/Home.css"; // Import the custom CSS
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"; 



const Home = () => {
  return (
    <div className="home-container">
      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="service-items">

        <div className="service-link">
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
              <Link to="/youtube-analysis">
              <button className="analyze-button">Analyze</button>
              </Link>
            </div>
          </div>

          <div className="service-link">
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
              <Link to="/reddit-analysis">
              <button className="analyze-button">Analyze</button>
              </Link>
            </div>
          </div>

       

          <div className="service-link">
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
              <Link to="/realtime-sentiment-analysis">
              <button className="analyze-button">Analyze</button>
              </Link>
            </div>
          </div>

        </div>
        <button className="contact-button">Contact Us</button>
      </section>

    </div>
  );
};

export default Home;
