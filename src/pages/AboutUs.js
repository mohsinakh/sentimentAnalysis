import React from 'react';
import './css/AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faRocket, faUser } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <section className="aboutus-header">
        <h1>About Us</h1>
        <p>We are a passionate team of students on a mission to revolutionize the future with innovative solutions.</p>
      </section>

      <section className="aboutus-mission">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>
            At <strong>Sentiment Sense </strong>, we aim to leverage cutting-edge technology to create impactful solutions that solve real-world problems.
            Our project is built on collaboration, innovation, and the shared vision of our diverse team.
          </p>
        </div>
        <div className="mission-icons">
          <div className="mission-item">
            <FontAwesomeIcon icon={faRocket} />
            <p>Innovation</p>
          </div>
          <div className="mission-item">
            <FontAwesomeIcon icon={faUser} />
            <p>Teamwork</p>
          </div>
          <div className="mission-item">
            <FontAwesomeIcon icon={faHandshake} />
            <p>Collaboration</p>
          </div>
        </div>
      </section>

      <section className="aboutus-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="team-member1.jpg" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>Lead Developer</p>
          </div>
          <div className="team-member">
            <img src="team-member2.jpg" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Project Manager</p>
          </div>
          <div className="team-member">
            <img src="team-member3.jpg" alt="Team Member 3" />
            <h3>James Brown</h3>
            <p>UI/UX Designer</p>
          </div>
          <div className="team-member">
            <img src="team-member4.jpg" alt="Team Member 4" />
            <h3>Sarah Lee</h3>
            <p>Data Scientist</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
