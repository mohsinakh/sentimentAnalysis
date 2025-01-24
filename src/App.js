import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to import BrowserRouter here
import ProtectedRoute from './pages/ProtectedRoute';
import Loading from './pages/Loading';
import "./App.css"

// Lazy loading components
const Navbar = lazy(() => import('./pages/Navbar'));
const Home = lazy(() => import('./pages/Home'));
const RealTimeSentimentAnalysis = lazy(() => import('./pages/RealTimeSentimentAnalysis'));
const YoutubeAnalysis = lazy(() => import('./pages/YoutubeAnalysis'));
const Footer = lazy(() => import('./pages/Footer'));
const RedditAnalysis = lazy(() => import('./pages/RedditAnalysis'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const LogoutPage = lazy(() => import('./pages/LogoutPage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Blog = lazy(()=> import('./pages/Blog'))


// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <div id="app-container">
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
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
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/realtime-sentiment-analysis" element={<RealTimeSentimentAnalysis />} />
              <Route path="/reddit-analysis" element={<RedditAnalysis />} />
              <Route path="/youtube-analysis" element={<YoutubeAnalysis />} />
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
