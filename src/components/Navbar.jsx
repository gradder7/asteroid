import React from "react";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div>
      <nav
        className="navbar navbar-light bg-light navbar-fixed-top"
        style={{ backgroundColor: "#212121" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" width={100} height={50} />
          </a>
          {/* hello */}
          <h1>Asteroid Data</h1>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
