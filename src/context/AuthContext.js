import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

const AUTO_LOGOUT_TIME = 400 * 60 * 1000; // 400 minutes in milliseconds

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));
  const [logoutTimer, setLogoutTimer] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setToken(null);
    if (logoutTimer) clearTimeout(logoutTimer);
  }, [logoutTimer]);

  const setAutoLogout = useCallback(() => {
    if (logoutTimer) clearTimeout(logoutTimer); // Clear any existing timer

    const timer = setTimeout(() => {
      alert("Your session has expired. You will be logged out.");
      logout();
      window.location.href = "/login";
    }, AUTO_LOGOUT_TIME);

    setLogoutTimer(timer); // Set the new timer
  }, [logout, logoutTimer]);

  const login = (newToken) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    setAutoLogout();
  };

  useEffect(() => {
    if (token) {
      setAutoLogout(); // Set auto-logout only when the token changes
    }
    return () => {
      clearTimeout(logoutTimer); // Clean up the timer on unmount or token change
    };
  }, [token, setAutoLogout, logoutTimer]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('access_token');
      setToken(updatedToken);

      if (!updatedToken && logoutTimer) clearTimeout(logoutTimer);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [logoutTimer]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
