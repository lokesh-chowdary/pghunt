import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import HomePage from './components/HomePage';
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
      <Layout />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pg/:id" element={<PGDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;