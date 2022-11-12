import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
  return (
    <div className="navBack">
      <nav>
        <ul className="navbar">
          <li>
            <Link to="/home">
              <button className="btnStyle">HOME</button>
            </Link>
          </li>
          <li>
            <Link to="/createPokemon">
              <button className="btnStyle">CREATE POKEMON</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
