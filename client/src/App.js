import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Timeline from './pages/Timeline';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

// Full Home Layout
function Home() {
  return (
    <>
      
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Contact />
      
    </>
  );
}

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return token ? children : null;
};

// Main App Component
function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setAuth(!!localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin setAuth={setAuth} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
