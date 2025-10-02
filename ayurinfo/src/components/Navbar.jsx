import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🌿 AyurInfo</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/plants" className={({ isActive }) => (isActive ? "active" : "")}>
            Plants
          </NavLink>
        </li>
        <li>
          <NavLink to="/compounds" className={({ isActive }) => (isActive ? "active" : "")}>
            Compounds
          </NavLink>
        </li>
        <li>
          <NavLink to="/ailments" className={({isActive})=>(isActive ? "active" : "")}>Ailments</NavLink>
        </li>
        <li>
          <NavLink to="/prescriptions" className={({isActive})=>(isActive ? "active" : "")}>Prescriptions</NavLink>
        </li>
      </ul>
      <div className="search">
        <FaSearch />
      </div>
    </nav>
  );
}

export default Navbar;
