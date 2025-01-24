import React from "react";
import "./css/Blog.css";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="blog-container">
      {/* Blog Header */}
      <header className="blog-header">
        <h1>Insights & Articles</h1>
        <p>Stay updated with the latest trends, news, and insights in sentiment analysis and AI technology.</p>
      </header>

      <div className="blog-content">
        {/* Main Blog Posts */}
        <section className="blog-posts">
          <article className="blog-post">
            <img
              src="https://via.placeholder.com/800x400"
              alt="Sentiment Analysis"
              className="blog-image"
            />
            <h2>
              <Link to="/post1">The Power of Sentiment Analysis in Social Media</Link>
            </h2>
            <p>
              Social media platforms have become the main source of communication and interaction, making sentiment analysis a crucial tool...
            </p>
            <Link to="/post1" className="read-more">
              Read More
            </Link>
          </article>

          <article className="blog-post">
            <img
              src="https://via.placeholder.com/800x400"
              alt="AI Insights"
              className="blog-image"
            />
            <h2>
              <Link to="/post2">AI and Its Role in Real-Time Sentiment Detection</Link>
            </h2>
            <p>
              Artificial Intelligence is reshaping the way we understand emotions and feedback from digital platforms...
            </p>
            <Link to="/post2" className="read-more">
              Read More
            </Link>
          </article>

          <article className="blog-post">
            <img
              src="https://via.placeholder.com/800x400"
              alt="Reddit Analysis"
              className="blog-image"
            />
            <h2>
              <Link to="/post3">How Reddit Comment Analysis is Shaping Opinions</Link>
            </h2>
            <p>
              Reddit’s comment section is a treasure trove of valuable insights, and understanding public sentiment can be a game-changer...
            </p>
            <Link to="/post3" className="read-more">
              Read More
            </Link>
          </article>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn">Previous</button>
            <button className="page-btn">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">Next</button>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="recent-posts">
            <h3>Recent Posts</h3>
            <ul>
              <li><Link to="/post1">The Power of Sentiment Analysis in Social Media</Link></li>
              <li><Link to="/post2">AI and Its Role in Real-Time Sentiment Detection</Link></li>
              <li><Link to="/post3">How Reddit Comment Analysis is Shaping Opinions</Link></li>
            </ul>
          </div>

          <div className="categories">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/category/ai">AI Technology</Link></li>
              <li><Link to="/category/sentiment">Sentiment Analysis</Link></li>
              <li><Link to="/category/socialmedia">Social Media</Link></li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="blog-footer">
        <p>&copy; 2025 Sentiment Sense | All Rights Reserved</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
