import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AdminBookings from './pages/admin/AdminBookings';
import AdminContent from './pages/admin/AdminContent';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pacotes" element={<AdminPackages />} />
            <Route path="reservas" element={<AdminBookings />} />
            <Route path="conteudo" element={<AdminContent />} />
          </Route>
          <Route path="/" element={
            <div className="min-h-screen flex flex-col bg-white">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="/reservar" element={<BookingPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
