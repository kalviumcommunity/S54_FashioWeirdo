import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/newlogo.png";
import { useCookies } from "react-cookie";


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies(["Username","userToken"]);

  const logout=()=>{
    removeCookie('Username');
    removeCookie('userToken')
    setIsLoggedIn(false)
  }
  useEffect(() => {
    const username = cookies["Username"];
    const userToken = cookies["userToken"];
    if (username && userToken) {
      setIsLoggedIn(true);
    }
  }, [cookies]);
  return (
    <nav className="navbar">
      <div className="navdesign">
        <div className="logo">
          <img src={logo} alt="" className="logoi" />
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-linkh">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/post" className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Filter" className="nav-link">
              Filter
            </Link>
          </li>
          <li className="nav-item">
            {isLoggedIn ? (
              <p className="nav-link" onClick={logout}>Logout</p>
            ) : (
              <Link to="/SignUp" className="nav-link">
                Signup
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
