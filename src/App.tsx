import React, { useState, useEffect } from "react";
import {
  Outlet,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home.js";
import AllSorted from "./pages/all-sorted/AllSorted.js";
import Navbar from "./components/navbar/Navbar.js";
import LoginModal from "./pages/login/LoginModal.js";
import Register from "./pages/register/Register.js";
import MyRatings from "./pages/my-ratings/MyRatings.js";
import Logout from "./pages/logout/Logout.js";
import { getRefresh } from "./services/backend/users.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    (async () => {
      const homeOrSorted =
        location.pathname === "/" || location.pathname === "/sorted";
      const isAuthenticated = await getRefresh();
      if (isAuthenticated) setIsLoggedIn(true);
      if (!isAuthenticated && isLoggedIn) setIsLoggedIn(false);
      if (!isAuthenticated && !homeOrSorted) navigate("/");
      console.log(process.env.NODE_ENV);
    })();
  }, []);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<LayoutsWithNavbar isLoggedIn={isLoggedIn} />}>
          <Route index element={<Home />} />
          <Route path="/sorted" element={<AllSorted />} />
          {isLoggedIn && (
            <>
              <Route path="/myratings" element={<MyRatings />} />
              <Route
                path="/logout"
                element={<Logout setIsLoggedIn={setIsLoggedIn} />}
              />
            </>
          )}
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/login"
            element={<LoginModal setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}
function LayoutsWithNavbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />

      <div className="main-wrapper">
        <Outlet />
      </div>
    </>
  );
}
