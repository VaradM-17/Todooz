import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../component style/ListTodo.scss";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light-custom">
        <div className="container-fluid">
          <Link to="/todos" className="navbar-brand mb-0 h1 text-white fs-2 fw-bold">
            Your Todooz
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
