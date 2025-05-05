import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../component style/ListTodo.scss";

const Header = () => {
  return (
    <div>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center">
          <Link
            to="/todos"
            className="no-underline text-amber-50 text-2xl font-extrabold tracking-tight visited:text-amber-50 hover:text-amber-100 focus:outline-none transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-lg"
          >
            <span className="text-amber-200 font-black fs-2">Your Todooz</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
