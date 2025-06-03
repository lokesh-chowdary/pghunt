import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/home/Layout';
import Home from './components/home/Home';
import Login from './components/store/Login';
import Register from './components/store/Register';
import ForgotPassword from './components/store/ForgotPassword';
import PGDetails from './components/home/PGCardDetails';
import Footer from './components/footer/Footer';
import HomePage from './components/HomePage';
import AddPGForm from './components/listpgdetails/AddPGForm';

function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pg/:id" element={<PGDetails />} />
          <Route path="/list-your-pg" element={<AddPGForm />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;