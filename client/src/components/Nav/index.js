import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link to="/" className="navbar-brand">
        Google Books
      </Link>
      <Link to="/search" className="navbar-brand minor-link">
        Search
      </Link>
      <Link to="/collections" className=" navbar-brand minor-link">
        Saved
        </Link>
    </nav>
  );
}


export default Nav;
