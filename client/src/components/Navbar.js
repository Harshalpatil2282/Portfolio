// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Harsh_Logo_5.png"; // Adjust the path as necessary
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <Link to="/Admin" className="logo-link">
        <img src={logo} alt="Logo" className="logo" />
        <span className="logo-text">DevHarsh</span>
      </Link>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={isOpen ? "bar open" : "bar"}></div>
        <div className={isOpen ? "bar open" : "bar"}></div>
        <div className={isOpen ? "bar open" : "bar"}></div>
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/skills" onClick={() => setIsOpen(false)}>Skills</Link>
        <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        {/* <Link to="/Login" onClick={() => setIsOpen(false)}>Login</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;






// // src/components/Navbar.js
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <nav className="navbar">
//       <Link to="/admin" className="logo">
//         <span>Harshal.dev</span>
//       </Link>

//       <div className="hamburger" onClick={toggleMenu}>
//         <div className={isOpen ? "bar open" : "bar"}></div>
//         <div className={isOpen ? "bar open" : "bar"}></div>
//         <div className={isOpen ? "bar open" : "bar"}></div>
//       </div>

//       <div className={`nav-links ${isOpen ? "open" : ""}`}>
//         <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
//         <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
//         <Link to="/skills" onClick={() => setIsOpen(false)}>Skills</Link>
//         <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
//         <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


