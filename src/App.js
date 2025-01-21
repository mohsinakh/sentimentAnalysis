import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import RealTimeSentimentAnalysis from './pages/RealTimeSentimentAnalysis';
import YoutubeAnalysis from './pages/YoutubeAnalysis';
import Footer from './pages/Footer';
import RedditAnalysis from './pages/RedditAnalysis';
import "./App.css";
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import LogoutPage from './pages/LogoutPage';
import AuthProvider from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';



const App = () => {
  return (
    <div id="app-container">
      <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<LogoutPage/>} />
            <Route path="/RealTimeSentimentAnalysis" element={<RealTimeSentimentAnalysis />} />
            <Route path="/RedditAnalysis" element={<RedditAnalysis />} />
            <Route path="/YoutubeAnalysis" element={<YoutubeAnalysis />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
