import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { postPokemon } from "../../redux/actions";
import { TiDelete } from "react-icons/ti";
import { CgPokemon } from "react-icons/cg";
import "./CreatePoke.css";

let arr = [];
export const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Pokemon name is required";
  } else if (!input.name.match(/^[A-Za-z]+$/)) {
    errors.name = "Name must contain only letters";
  }

  if (parseFloat(input.hp) === 0) {
    errors.hp = "HP can not be 0";
  } else if (isNaN(input.hp)) {
    errors.hp = "Please only enter numeric characters only!";
  }

  if (parseFloat(input.attack) === 0) {
    errors.attack = "Height can not be 0";
  } else if (isNaN(input.attack)) {
    errors.attack = "Please only enter numeric characters only!";
  }

  if (parseFloat(input.defense) === 0) {
    errors.defense = "Defense can not be 0";
  } else if (isNaN(input.defense)) {
    errors.defense = "Please only enter numeric characters only!";
  }

  if (parseFloat(input.speed) === 0) {
    errors.speed = "Speed can not be 0";
  } else if (isNaN(input.speed)) {
    errors.speed = "Please only enter numeric characters only!";
  }

  if (parseFloat(input.weight) === 0) {
    errors.weight = "Weight can not be 0";
  } else if (isNaN(input.weight)) {
    errors.weight = "Please only enter numeric characters only!";
  }

  if (parseFloat(input.height) === 0) {
    errors.height = "Height can not be 0";
  } else if (isNaN(input.height)) {
    errors.height = "Please only enter numeric characters only!";
  }

  return errors;
};

const CreatePoke = (props) => {
  const dispatch = useDispatch();
  const pokeTypes = useSelector((store) => store.types);

  const [arrTypes, setArrTypes] = useState([]);
  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type: [],
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    if (property === "type") {
      arr.push(value);

      setArrTypes(arr);
    }
    setInput({ ...input, [property]: value });
    setErrors(validate({ ...input, [property]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pokeFinal = {
      name: input.name,
      hp: input.hp,
      attack: input.attack,
      defense: input.defense,
      speed: input.speed,
      height: input.height,
      weight: input.weight,
      image: input.image,
      type: arrTypes,
    };
    console.log(pokeFinal);
    dispatch(postPokemon(pokeFinal));
    window.location.reload();
  };

  const removeType = (e) => {
    e.preventDefault();
    console.log(arrTypes);
    const vType = e.target.value;
    const index = arrTypes.indexOf(vType);
    console.log(vType);
    console.log(index);

    const elementRemoved = arrTypes.filter((_, i) => i !== index);
    setArrTypes(elementRemoved);
    arr = elementRemoved;
  };
  return (
    <>
      <NavBar />

      <form className="formStyled" onSubmit={handleSubmit}>
        <h1>
          <CgPokemon />
          Create Pokemon
        </h1>
        <label>Pokemon: </label>
        <input
          className="inputSt"
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="errorSt">{errors.name}</p>}
        <br />
        <label>HP: </label>
        <input
          className="inputSt"
          type="text"
          name="hp"
          value={input.hp}
          onChange={handleInputChange}
        />
        {errors.hp && <p className="errorSt">{errors.hp}</p>}
        <br />
        <label>Attack: </label>
        <input
          className="inputSt"
          type="text"
          name="attack"
          value={input.attack}
          onChange={handleInputChange}
        />
        {errors.attack && <p className="errorSt">{errors.attack}</p>}
        <br />
        <label>Defense: </label>
        <input
          className="inputSt"
          type="text"
          name="defense"
          value={input.defense}
          onChange={handleInputChange}
        />
        {errors.defense && <p className="errorSt">{errors.defense}</p>}
        <br />
        <label>Speed: </label>
        <input
          className="inputSt"
          type="text"
          name="speed"
          value={input.speed}
          onChange={handleInputChange}
        />
        {errors.speed && <p className="errorSt">{errors.speed}</p>}
        <br />
        <label>Weight: </label>
        <input
          className="inputSt"
          type="text"
          name="weight"
          value={input.weight}
          onChange={handleInputChange}
        />
        {errors.weight && <p className="errorSt">{errors.weight}</p>}
        <br />
        <label>Height: </label>
        <input
          className="inputSt"
          type="text"
          name="height"
          value={input.height}
          onChange={handleInputChange}
        />
        {errors.height && <p className="errorSt">{errors.height}</p>}
        <br />
        <label>Image: </label>
        <input
          className="inputSt"
          type="text"
          name="image"
          value={input.image}
          onChange={handleInputChange}
        />
        <br />
        <label>Types: </label>
        <select className="inputSt" name="type" onChange={handleInputChange}>
          <option value="">--Please choose an option--</option>
          {pokeTypes.map((d, index) => (
            <option value={d.type} key={index}>
              {d.type}
            </option>
          ))}
        </select>

        <div>
          {arrTypes.map((d, index) => (
            <button key={index} value={d} onClick={(e) => removeType(e)}>
              {d} <TiDelete />
            </button>
          ))}
        </div>

        <br />
        {input.name &&
          input.hp &&
          input.attack &&
          input.defense &&
          input.speed &&
          input.height &&
          input.weight &&
          input.image &&
          input.type && <button type="submit">Submit</button>}
      </form>
    </>
  );
};

export default CreatePoke;
