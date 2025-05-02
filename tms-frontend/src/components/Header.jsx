import React from "react";
import "../component style/ListTodo.scss";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light-custom">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-white fs-2 fw-bold">Your Todooz</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
