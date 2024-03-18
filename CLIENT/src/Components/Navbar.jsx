import React from 'react';
import { Link } from 'react-router-dom'; 
import "../App.css"

function Navbar() {
  return (
    <nav className="navbar">
      <div className='navdesign'>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-linkh">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/post" className="nav-link">Post</Link>
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
