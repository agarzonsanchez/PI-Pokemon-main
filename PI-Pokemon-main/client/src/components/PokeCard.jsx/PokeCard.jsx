import React from "react";
import "./PokeCard.css";
import { Link } from "react-router-dom";

const PokeCard = (props) => {
  console.log(props.id);
  return (
    <Link to={`/details/${props.id}`} className="linkPoke">
      <div className="card">
        <h1 className="pokeTitle">{props.name.toUpperCase()}</h1>
        <img className="imagePoke" src={props.image} alt="Pokemon" />
        <p className="textDeco">Type: {props.type}.</p>
      </div>
    </Link>
  );
};

export default PokeCard;
