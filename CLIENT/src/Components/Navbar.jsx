import React from 'react';
import { Link } from 'react-router-dom'; 
import "../App.css"
import logo from "../assets/newlogo.png"

function Navbar() {
  return (
    <nav className="navbar">
      <div className='navdesign'>
        <div className='logo'>
          <img src={logo} alt="" className='logoi'/>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-linkh">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/post" className="nav-link">Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Signup</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
