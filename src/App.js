import Header from "./Components/Header/Header.js";
import "./App.css";
import Footer from "./Components/Footer/Footer.js";
import React from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <Outlet />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
