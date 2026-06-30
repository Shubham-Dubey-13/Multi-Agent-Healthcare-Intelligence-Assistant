import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';

import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Upload from './pages/Upload';
import SymptomChecker from './pages/SymptomChecker';
import RiskAssessment from './pages/RiskAssessment';
import Reports from './pages/Reports';
import History from './pages/History';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import BMICalculator from './pages/BMICalculator';
import MedicineReminders from './pages/MedicineReminders';

import Layout from './components/Layout/Layout';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0A0F1E' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #6366F1', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#94A3B8', fontSize: 14 }}>Loading your health dashboard...</p>
      </div>
    </div>
  );
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;

  return (
    <Routes>
      <Route path="/login"    element={!isAuthenticated ? <Login />    : <Navigate to="/" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />

      <Route path="/"               element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/chat"           element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/upload"         element={<ProtectedRoute><Upload /></ProtectedRoute>} />
      <Route path="/symptoms"       element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />
      <Route path="/risk-assessment" element={<ProtectedRoute><RiskAssessment /></ProtectedRoute>} />
      <Route path="/reports"        element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/history"        element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="/profile"        element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/bmi-calculator" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
      <Route path="/medicines"      element={<ProtectedRoute><MedicineReminders /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
