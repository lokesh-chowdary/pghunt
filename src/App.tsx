import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/home/Layout';
import Home from './components/home/Home';
import Login from './components/store/Login';
import Register from './components/store/Register';
import ForgotPassword from './components/store/ForgotPassword';
import PGDetails from './components/pages/PGCardDetails';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/store/ProtectedRoute'; // Import ProtectedRoute
import AddPGForm from './components/listpgdetails/AddPGForm'; // Import the form component


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