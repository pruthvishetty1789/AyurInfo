import React from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa"; // Import the search icon

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🌿 AyurInfo</div>
      <ul className="nav-links">
        <li>Home</li>
        <li>Plants</li>
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