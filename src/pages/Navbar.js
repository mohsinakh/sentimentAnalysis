import React from 'react'
import { Link } from 'react-router-dom'
import "./css/Navbar.css"

function Navbar() {
    return (
        <div>
            <header className="header">
            <h1>Sentiment Sense</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faqs">FAQs</a></li>
          </ul>
        </nav>
        </header>
        </div>
    )
}

export default Navbar
