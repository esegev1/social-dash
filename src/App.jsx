// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
// 🛑 REMOVED: import { useEffect } from 'react'; // Not needed since interceptor setup is in AuthContext
// 🛑 REMOVED: import { initializeInterceptors } from './api/setupInterceptors'; // Not needed here
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import LoginPage from "./components/LoginPage/LoginPage.jsx";
import DashboardPage from './pages/DashboardPage.jsx';
import './App.css';

// Wrapper component
const AppContent = () => {
  // We still call useAuth, but the interceptor initialization logic is gone.
  // The interceptors are now initialized synchronously inside AuthProvider.
  const authContext = useAuth(); 

  // 🛑 The old useEffect block is removed entirely!
  /*
  useEffect(() => {
    initializeInterceptors(authContext);
  }, [authContext.accessToken]); 
  */

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