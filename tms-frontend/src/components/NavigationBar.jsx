import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../services/AuthService";

const NavigationBar = () => {
  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();
  function handleLogOut() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-5 py-3">
      <NavLink className="navbar-brand fs-3 fw-bold text-primary" to="/">
        Todooz
      </NavLink>
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-lg-center gap-3">
          {isAuth && (
            <li className="nav-item">
              <NavLink className="nav-link fw-semibold text-dark" to="/">
                Tasks
              </NavLink>
            </li>
          )}

          {!isAuth && (
            <li className="nav-item">
              <NavLink
                className="btn btn-primary fw-semibold px-4 py-2 rounded-pill shadow-sm"
                to="/register"
              >
                Register
              </NavLink>
            </li>
          )}
          {!isAuth && (
            <li className="nav-item">
              <NavLink
                className="btn btn-primary fw-semibold px-4 py-2 rounded-pill shadow-sm"
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
          {isAuth && (
            <li className="nav-item">
              <NavLink
                className="btn btn-primary fw-semibold px-4 py-2 rounded-pill shadow-sm"
                to="/login"
                onClick={handleLogOut}
              >
                Log out
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
