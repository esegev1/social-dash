// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { useEffect } from 'react';
import { initializeInterceptors } from './api/setupInterceptors';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import DashboardPage from './pages/DashboardPage.jsx';
import './App.css';

// Wrapper to initialize interceptors after AuthProvider is ready
const AppContent = () => {
  const authContext = useAuth();

  useEffect(() => {
    initializeInterceptors(authContext);
  }, [authContext.accessToken]); // Re-initialize when token changes

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;