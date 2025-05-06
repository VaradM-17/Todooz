import React from "react";
import { Link } from "react-router-dom";
import "../component style/ListTodo.scss";
import bannerImage from "../images/banner.png";

const Header = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center">
          <Link
            to="/todos"
            className="no-underline text-amber-50 font-extrabold tracking-tight visited:text-amber-50 hover:text-amber-100 focus:outline-none transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-lg"
          >
            <span className="text-amber-200 font-black text-4xl">
              Your Todooz
            </span>
          </Link>
        </div>
      </nav>

    </div>
  );
};

export default Header;
