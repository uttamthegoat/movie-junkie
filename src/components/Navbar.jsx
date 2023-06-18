import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand Navbar__pageTitle">
          {props.title}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item me-5">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink to="/movies" className="nav-link">
                Movies
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink to="/tv_series" className="nav-link">
                TV Series
              </NavLink>
            </li>
            <li className="nav-item me-5">
              <NavLink to="/search" className="nav-link">
                <i className="fa-solid fa-magnifying-glass"></i>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
