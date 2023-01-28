import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
import dogSVG from "../../assets/dog-api-logo.svg";
import hamburgerSVG from "../../assets/hamburger-icon.svg";

function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  2;
  const location = useLocation();

  function handleClick() {
    setIsNavExpanded(!isNavExpanded);
    isNavExpanded
      ? (document.body.style.overflow = "visible")
      : (document.body.style.overflow = "hidden");
  }
  return (
    <>
      <nav className="navigation">
        <img src={dogSVG} alt="Dog SVG" className="brand" />
        <Link to="/" className="brand-name">
          Dog API Clone
        </Link>
        <button
          className="hamburger"
          onClick={() => {
            handleClick();
          }}
        >
          <img src={hamburgerSVG} alt="Drop Down Icon" />
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            <li>
              <Link to="/dogs">Rated Dogs</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
            <li>
              <Link to="/login" state={{ background: location }}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" state={{ background: location }}>
                Sign Up
              </Link>
            </li>
          </ul>
          <div className="contact-nav">
            <a
              href="https://github.com/willco123/"
              target="_blank"
              rel="noreferrer"
            >
              Github Code
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
