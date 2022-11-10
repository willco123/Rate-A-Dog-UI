import React from "react";
import "./App.css";
import Dogs from "./components/dogs/Dogs";
import Navbar from "./components/navbar/Navbar";
import { Outlet, Routes, Route, useLocation } from "react-router-dom";
import LoginModal from "./components/login/LoginModal";
import Register from "./components/register/Register";
import Favourites from "./components/favourites/Favourites";
import RatedDogs from "./components/rated-dogs/RatedDogs";

export default function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<LayoutsWithNavbar />}>
          <Route index element={<Dogs />} />
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
