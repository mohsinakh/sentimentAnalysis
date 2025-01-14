import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import RealTimeSentimentAnalysis from './pages/RealTimeSentimentAnalysis';
import YoutubeAnalysis from './pages/YoutubeAnalysis';
import Footer from './pages/Footer';
import RedditAnalysis from './pages/RedditAnalysis';
import "./App.css";

const App = () => {
  return (
    <div id="app-container">
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/RealTimeSentimentAnalysis" element={<RealTimeSentimentAnalysis />} />
            <Route exact path="/RedditAnalysis" element={<RedditAnalysis />} />
            <Route exact path="/YoutubeAnalysis" element={<YoutubeAnalysis />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
