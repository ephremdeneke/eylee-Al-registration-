import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Success from './pages/Success';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import RegistrationDetails from './pages/RegistrationDetails';
import NotFound from './pages/NotFound';

function LayoutWrapper({ children }) {
  const location = useLocation();
  // Hide global navbar/footer only on the login screen, but display them on the admin dashboard and details screens
  const isLoginRoute = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginRoute && <Navbar />}
      
      <main className="flex-grow">
        {children}
      </main>

      {!isLoginRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/registration/:id" element={<RegistrationDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}
