import React, { useState, useEffect } from "react";
import { Outlet, Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import Home from "./pages/home/Home.js";
import Navbar from "./components/navbar/Navbar.js";
import LoginModal from "./pages/login/LoginModal.js";
import Register from "./pages/register/Register.js";
import MyRatings from "./pages/my-ratings/MyRatings.js";
// import AllRatings from "./pages/all-ratings/AllRatings.js";
import Logout from "./pages/logout/Logout";
import { getRefresh } from "./services/backend";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    (async () => {
      const isAuthenticated = await getRefresh();

      if (isAuthenticated) setIsLoggedIn(true);
    })();
  }, []);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<LayoutsWithNavbar isLoggedIn={isLoggedIn} />}>
          <Route index element={<Home />} />
          {/* <Route path="/dogs" element={<AllRatings />} /> */}

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

//for testing may have to split app and routes to allow for router to be rendered/redclared
