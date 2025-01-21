import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faInfoCircle, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import "./css/Navbar.css";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleNavClick = (path) => {
    setActivePath(path);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="header">
        <h1><Link to="/" className="navbar-title">Sentiment Sense</Link></h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/profile" className="nav-link">Profile</Link></li>
            <li><Link className="nav-link" to="/about">About Us</Link></li>
            <li><Link className="nav-link" to="/services">Services</Link></li>
            <li><Link className="nav-link" to="/blog">Blog</Link></li>
            <li><Link className="nav-link" to="/contact">Contact Us</Link></li>
            <li><Link className="nav-link" to="/faqs">FAQs</Link></li>
            {token ? (
              <li>
                <button onClick={logout} className="nav-link btn">Logout</button>
              </li>
            ) : (
              <li><Link to="/login" className="btn btn">Login/SignUp</Link></li>
            )}
          </ul>
        </nav>
      </header>

      {/* Bottom Navigation for Mobile */}
      <div className="bottom-nav">
        <Link 
          to="/" 
          className={`nav-item ${activePath === "/" ? "active" : ""}`} 
          onClick={() => handleNavClick("/")}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Home</span>
        </Link>
        <Link 
          to="/profile" 
          className={`nav-item ${activePath === "/profile" ? "active" : ""}`} 
          onClick={() => handleNavClick("/profile")}
        >
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </Link>
        <Link 
          to="/about" 
          className={`nav-item ${activePath === "/about" ? "active" : ""}`} 
          onClick={() => handleNavClick("/about")}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>About</span>
        </Link>
        <Link 
          to="/contact" 
          className={`nav-item ${activePath === "/contact" ? "active" : ""}`} 
          onClick={() => handleNavClick("/contact")}
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Contact</span>
        </Link>
        <Link 
          to="/settings" 
          className={`nav-item ${activePath === "/settings" ? "active" : ""}`} 
          onClick={() => handleNavClick("/settings")}
        >
          <FontAwesomeIcon icon={faCog} />
          <span>Settings</span>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
