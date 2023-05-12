import React, { useState, useEffect } from "react";
import {
  Outlet,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.scss";
import loadable from "@loadable/component";
import { getRefresh } from "./services/backend/users.js";

const Home = loadable(
  () => import(/* webpackChunkName: "Home" */ "./pages/home/Home.js"),
);
const AllSorted = loadable(
  () =>
    import(
      /* webpackChunkName: "AllSorted" */ "./pages/all-sorted/AllSorted.js"
    ),
);
const Navbar = loadable(
  () =>
    import(/* webpackChunkName: "Navbar" */ "./components/navbar/Navbar.js"),
);
const LoginModal = loadable(
  () =>
    import(/* webpackChunkName: "LoginModal" */ "./pages/login/LoginModal.js"),
);
const Register = loadable(
  () =>
    import(/* webpackChunkName: "Register" */ "./pages/register/Register.js"),
);
const MyRatings = loadable(
  () =>
    import(
      /* webpackChunkName: "MyRatings" */ "./pages/my-ratings/MyRatings.js"
    ),
);
const Logout = loadable(
  () => import(/* webpackChunkName: "Logout" */ "./pages/logout/Logout.js"),
);

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
