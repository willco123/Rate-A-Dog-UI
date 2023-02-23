import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import { Outlet, Routes, Route, useLocation } from "react-router-dom";
import LoginModal from "./pages/login/LoginModal";
import Register from "./pages/register/Register";
import Favourites from "./pages/favourites/Favourites";
import RatedDogs from "./pages/rated-dogs/RatedDogs";

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<LayoutsWithNavbar />}>
          <Route index element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/dogs" element={<RatedDogs />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

function LayoutsWithNavbar() {
  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <Outlet />
      </div>
    </>
  );
}

//for testing may have to split app and routes to allow for router to be rendered/redclared
