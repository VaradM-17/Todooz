import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../component style/ListTodo.scss";

const Header = () => {
  return (
    // <div>
    //   <nav className="navbar navbar-light bg-light-custom">
    //     <div className="container-fluid">
    //       <Link to="/todos" className="navbar-brand mb-0 h1 text-white fs-2 fw-bold">
    //         Your Todooz
    //       </Link>
    //     </div>
    //   </nav>
    // </div>

    <div>
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center">
        <Link to="/todos" className="text-amber-50 text-2xl font-extrabold tracking-tight">
          <span className="mr-1">Your</span>
          <span className="text-amber-200 font-black">Todooz</span>
        </Link>
        </div>
    </nav>
  </div>
  );
};

export default Header;
