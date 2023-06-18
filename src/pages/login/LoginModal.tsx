import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-modal.scss";
import dogSVG from "../../assets/dog-api-logo.svg";
import { postLogin } from "../../services/backend/users.js";
import type { LoginData } from "../../types.js";

export default function LoginModal({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [badDetails, setBadDetails] = useState<boolean>(false);

  const navigate = useNavigate();
  function clickModalBG(event: MouseEvent) {
    const target = event.target as HTMLBodyElement;
    if (target.getAttribute("class") === "darkBG") navigate(-1);
  }
  useEffect(() => {
    document.addEventListener("click", clickModalBG);
    return () => {
      document.removeEventListener("click", clickModalBG);
      setBadDetails(false);
    };
  }, []);

  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const data = new FormData(target);
    const loginData = Object.fromEntries(data) as LoginData;
    const response = await postLogin(loginData);

    if (response) {
      setIsLoggedIn(true);
      navigate("/");
      return;
    }
    return setBadDetails(true);
  }

  return (
    <div className="darkBG">
      <form onSubmit={handleClick} className="login-container">
        <img src={dogSVG} alt="Dog SVG" className="brandTwo" />
        <div className="login-close" onClick={() => navigate(-1)} />
        <input className="login-input" name="username" placeholder="Username" />
        <input className="login-input" name="password" placeholder="Password" />
        <button className="login-button" aria-label="submit-login-button">
          Login
        </button>
        {badDetails && (
          <span className="login-bad">Incorrect Username or Password</span>
        )}
        <div className="login-footer"> Don't have an account? Sign-up!</div>
      </form>
    </div>
  );
}
