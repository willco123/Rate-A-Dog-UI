import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import dogSVG from "../../assets/dog-api-logo.svg";
import hamburgerSVG from "../../assets/hamburger-icon.svg";
import classnames from "classnames";

function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  2;
  const location = useLocation();
  // useEffect(() => {
  //   isNavExpanded
  //     ? (document.body.style.overflow = "hidden")
  //     : (document.body.style.overflow = "visible");
  // }, [isNavExpanded]);

  function handleClick() {
    setIsNavExpanded(!isNavExpanded);
  }

  function handleLinkClick() {
    setIsNavExpanded(false);
  }
  return (
    <>
      <nav className={classnames("navigation", { expanded: isNavExpanded })}>
        <a
          className="brand-name"
          href="https://dog.ceo/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={dogSVG} alt="Dog SVG" className="brand" />
          {!isNavExpanded && `Powered by Dog Ceo!`}
        </a>
        <button
          type="button"
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
              <Link to="/" onClick={handleLinkClick}>
                Random
              </Link>
            </li>
            <li>
              <Link to="/sorted" onClick={handleLinkClick}>
                All Ratings
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/myratings" onClick={handleLinkClick}>
                  My Ratings
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  state={{ background: location }}
                >
                  Login
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link
                  to="/register"
                  onClick={handleLinkClick}
                  state={{ background: location }}
                >
                  Sign Up
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/logout" onClick={handleLinkClick}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className={isNavExpanded ? "contact-nav expanded" : "contact-nav"}>
          <a
            href="https://github.com/willco123/"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
