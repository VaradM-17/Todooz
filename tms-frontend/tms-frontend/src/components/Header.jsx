import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const toggleTheme = (value) => {
    document.documentElement.setAttribute("data-bs-theme", value);
  };

  return (
    <header className="mb-5">
      <div className="container mt-4">
        {/* Theme Toggle */}
        <div className="d-flex justify-content-end">
          <div className="btn-group">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => toggleTheme("dark")}
              title="Dark Mode"
            >
              <i className="bi bi-moon-fill"></i>
            </button>
            <button
              className="btn btn-light btn-sm"
              onClick={() => toggleTheme("light")}
              title="Light Mode"
            >
              <i className="bi bi-sun-fill"></i>
            </button>
          </div>
        </div>

        {/* Navbar */}
        <nav className="navbar bg-body border-bottom border-top my-4">
          <div className="container-fluid">
            {/* Brand */}
            <a
              className="navbar-brand text-primary-emphasis fs-2 fw-bold"
              href="#"
            >
              Todooz
            </a>

            {/* Links */}
            <div className="d-flex align-items-center gap-3">
              <ul className="nav">
                <li className="nav-item">
                  <a
                    href="/"
                    className="nav-link text-body fw-semibold"
                  >
                    List Todos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
