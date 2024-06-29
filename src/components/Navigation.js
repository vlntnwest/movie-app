import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="header">
      <h1>React Movies</h1>
      <nav>
        <ul>
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Accueil</li>
          </NavLink>
          <NavLink
            to="/favoris"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>Favoris</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
