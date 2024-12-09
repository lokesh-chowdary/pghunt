import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PGDetails from './pages/PGDetails';
import Footer from './footer/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import AddPGForm from './pages/AddPGForm'; // Import the form component


function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="pg/:id" element={<PGDetails />} />
          <Route path="/list-your-pg" element={<AddPGForm />} /> {/* Form route */}

          {/* Protected Routes Placeholder (Add actual components later) */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <div>Dashboard Page Placeholder</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <div>Profile Page Placeholder</div>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;