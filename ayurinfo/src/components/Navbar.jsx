import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa"; // Import the search icon

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🌿 AyurInfo</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/plants">Plants</Link></li>
        <li>Ailments</li>
        <li>Prescriptions</li>
      </ul>
      <div className="search">
        <FaSearch /> {/* Use the imported component here */}
      </div>
    </nav>
  );
}

export default Navbar;