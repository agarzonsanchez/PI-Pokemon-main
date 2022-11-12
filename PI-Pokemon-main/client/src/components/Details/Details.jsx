import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import "./Details.css";
import { TbSwords } from "react-icons/tb";
import { AiOutlineHeart, AiOutlineThunderbolt } from "react-icons/ai";
import { BsShield } from "react-icons/bs";
import { GiWeight, GiBodyHeight } from "react-icons/gi";
import { CgPokemon } from "react-icons/cg";

const Details = (props) => {
  const [pokeDetails, setPokeDetails] = useState({});
  const id = props.match.params.id;
  useEffect(() => {
    setPokeDetails(detailsPoke);
  }, []);

  const detailsPoke = async () => {
    const poke = await axios.get(`http://localhost:3001/pokemons/${id}`);
    let arr = [];

    for (let i = 0; i < poke.data[0].types.length; i++) {
      arr.push(poke.data[0].types[i].type);
    }
    poke.data[0]["type"] = arr.join(", ");
    setPokeDetails(poke.data[0]);
  };

  return (
    <>
      <NavBar />

      <div className="cardPokeDetails">
        <h1>Pokedex</h1>
        <img
          className="imagePokeDetails"
          src={pokeDetails.image}
          alt="Pokemon"
        />
        <p>{pokeDetails.name}</p>
        <p>
          <AiOutlineHeart />
          HP: {pokeDetails.hp}
        </p>
        <p>
          <TbSwords />
          ATTACK: {pokeDetails.attack}
        </p>
        <p>
          <BsShield />
          DEFENSE: {pokeDetails.defense}
        </p>
        <p>
          <AiOutlineThunderbolt />
          SPEED: {pokeDetails.speed}
        </p>
        <p>
          <GiBodyHeight />
          HEIGHT: {pokeDetails.height}
        </p>
        <p>
          <GiWeight />
          WEIGHT: {pokeDetails.weight}
        </p>
        <p>
          <CgPokemon />
          TYPE: {pokeDetails.type}
        </p>
      </div>
    </>
  );
};

export default Details;
