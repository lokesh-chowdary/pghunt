import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
<<<<<<< HEAD
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
=======
import Layout from './components/home/Layout';
import Home from './components/home/Home';
import Login from './components/store/Login';
import Register from './components/store/Register';
import ForgotPassword from './components/store/ForgotPassword';
import PGDetails from './components/pages/PGCardDetails';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/store/ProtectedRoute'; // Import ProtectedRoute
import AddPGForm from './components/listpgdetails/AddPGForm'; // Import the form component
>>>>>>> 878d0bdfce9596258ea486af6003fd52345fd82a


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