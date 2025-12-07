import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/home/Layout';
import Home from './components/home/Home';
import Login from './components/store/Login';
import Register from './components/store/Register';
import ForgotPassword from './components/store/ForgotPassword';
import PGDetails from './components/home/PGCardDetails';
import YourListings from './components/home/YourListings';
import UserProfile from './components/profile/UserProfile';
import Footer from './components/footer/Footer';
import HomePage from './components/HomePage';
import AddPgForm from './components/listpgdetails/AddPgForm';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/store/ProtectedRoute';
import About from "./components/About";
import Contact from "./components/Contact";
import Privacy_Policy from "./components/Privacy_Policy";
import Cookie_Policy from "./components/Cookie_Policy";
import Terms_of_service from "./components/Privacy_Policy"; // your existing import

// ✅ import the mobile bottom nav
import Mobile_nav_bar from "./components/home/Mobile_nav_bar";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Toaster position="top-center" richColors />

        {/* Layout wrapper so content has space above the fixed bottom nav */}
        <div className="min-h-screen flex flex-col">
          {/* Main app content */}
          <div className="flex-1 pb-20">
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/pg/:id" element={<PGDetails />} />
                <Route
                  path="/list-your-pg"
                  element={
                    <ProtectedRoute>
                      <AddPgForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/your-listings"
                  element={
                    <ProtectedRoute>
                      <YourListings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy_policy" element={<Privacy_Policy />} />
                <Route path="/cookie_policy" element={<Cookie_Policy />} />
                <Route path="/terms_of_service" element={<About />} />
              </Route>
            </Routes>
          </div>

          {/* Desktop footer (shows everywhere) */}
          <Footer />

          {/* ✅ Mobile bottom nav – constant for all pages, hidden on desktop */}
          <Mobile_nav_bar />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
