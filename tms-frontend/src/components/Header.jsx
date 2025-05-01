import React from "react";
import "../component style/ListTodo.scss";

const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-light bg-light-custom">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1 text-white fs-2 fw-bold">Your Todooz</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
