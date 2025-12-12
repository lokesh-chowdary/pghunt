import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/layout/Layout';
import SearchPage from './components/pages/SearchPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import PGDetailsPage from './components/pages/PGDetailsPage';
import YourListingsPage from './components/pages/YourListingsPage';
import ProfilePage from './components/pages/ProfilePage';
import LandingPage from './components/pages/LandingPage';
import WishlistPage from './components/pages/WishlistPage';
import AddPgForm from './components/pg-listing/AddPgForm';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import PrivacyPolicy from "./components/policies/PrivacyPolicy";
import CookiePolicy from "./components/policies/CookiePolicy";
import TermsOfService from "./components/policies/TermsOfService";


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/pg/:id" element={<PGDetailsPage />} />
            <Route path="/list-your-pg" element={<ProtectedRoute><AddPgForm /></ProtectedRoute>} />
            <Route path="/your-listings" element={<ProtectedRoute><YourListingsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy_policy" element={<PrivacyPolicy />} />
            <Route path="/cookie_policy" element={<CookiePolicy />} />
            <Route path="/terms_of_service" element={<TermsOfService />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;