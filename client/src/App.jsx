import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AuthForm from './pages/AuthForm.jsx';
import IndiaTrips from './pages/IndiaTrips.jsx';
import InternationalTrips from './pages/InternationalTrips.jsx';
import Honeymoon from './pages/Honeymoon.jsx';
import About from './pages/About.jsx';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingContactButton from './components/common/FloatingContactButton'; 
import { AuthProvider, useAuth } from './context/AuthContext'; 
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagePackages from './pages/Admin/ManagePackages';
import Customers from './pages/Admin/Customers';

// --- NEW IMPORT ---
import Profile from './pages/Profile.jsx'; 

import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';

import TripDetails from './pages/TripDetails';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.isAdmin ? children : <Navigate to="/login" />;
};

// 1. Create a child component to handle the Logic
const AppContent = () => {
  const location = useLocation(); 

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isTripDetailsPage = location.pathname.startsWith('/package');
  const shouldHideNav = isAuthPage || isAdminPage || isTripDetailsPage;

  return (
    <>
      <ScrollToTop />
      
      {/* Conditionally Render Navbar */}
      {!shouldHideNav && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm isSignUp />} />
        <Route path="/india" element={<IndiaTrips />} />
        <Route path="/international" element={<InternationalTrips />} />
        <Route path="/honeymoon" element={<Honeymoon />} />
        <Route path="/about" element={<About />} />
        <Route path="/package/:id" element={<TripDetails />} />
        
        {/* --- USER PROFILE ROUTE --- */}
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
           <Route path="dashboard" element={<h2>Welcome to Dashboard</h2>} />
           <Route path="packages" element={<ManagePackages />} />
           <Route path="customers" element={<Customers />} />
        </Route>
      </Routes>

      {/* Conditionally Render Footer */}
      {!shouldHideNav && <Footer />}

      {/* Hide Floating Button on Admin */}
      {!isAdminPage && <FloatingContactButton />}
    </>
  );
};

// 2. Main App Component provides the Router & Auth Context
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;