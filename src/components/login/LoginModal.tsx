import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-modal.css";
import dogSVG from "../common/dog-api-logo.svg";

export default function LoginModal() {
  const navigate = useNavigate();
  function clickModalBG(event: MouseEvent) {
    const target = event.target as HTMLBodyElement;
    if (target.getAttribute("class") === "darkBG") navigate(-1);
  }
  useEffect(() => {
    document.addEventListener("click", clickModalBG);
    return () => {
      document.removeEventListener("click", clickModalBG);
    };
  }, []);

  return (
    <div className="darkBG">
      <div className="login-container">
        <img src={dogSVG} alt="Dog SVG" className="brandTwo" />
        <div className="login-close" onClick={() => navigate(-1)} />
        <input className="login-input" name="Email" placeholder="Email" />
        <input className="login-input" name="Password" placeholder="Password" />
        <button className="login-button">Login</button>
        <div className="login-footer"> Don't have an account? Sign-up!</div>
      </div>
    </div>
  );
}
