import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import PokeCard from "../PokeCard.jsx/PokeCard";
import Input from "../Input/Input";
import "./Home.css";

const Home = (props) => {
  let pokemons = useSelector((store) => store.allPokemons);
  let typesPoke = useSelector((store) => store.types);
  console.log(pokemons);
  const [pokemonsList, setPokemonsList] = useState([]);
  const [page, setPage] = useState(0);
  const [inputState, setInputState] = useState("");

  const prevPage = () => {
    if (page >= 12) setPage(page - 12);
  };

  const nextPage = () => {
    if (pokemonsList.length > page + 12) setPage(page + 12);
  };
  const update = () => {
    return pokemonsList.slice(page, page + 12);
  };
  let pokemonUpdated = update();

  const validateType = (type, arr = []) => {
    for (let i = 0; i < type.length; i++) {
      arr.push(type[i].type);
    }

    return arr.join(", ");
  };

  const orderAZ = () => {
    let arr = [];
    let finalArr = [];
    for (let i = 0; i < pokemonsList.length; i++) {
      arr.push(pokemonsList[i].name);
    }
    arr.sort();
    for (let g = 0; g < arr.length; g++) {
      let pokeFilter = pokemonsList.find((e) => e.name === arr[g]);
      finalArr.push(pokeFilter);
    }
    setPokemonsList(finalArr);
  };

  const orderZA = () => {
    let arr = [];
    let finalArr = [];
    for (let i = 0; i < pokemonsList.length; i++) {
      arr.push(pokemonsList[i].name);
    }
    arr.sort().reverse();
    for (let g = 0; g < arr.length; g++) {
      let pokeFilter = pokemonsList.find((e) => e.name === arr[g]);
      finalArr.push(pokeFilter);
    }
    setPokemonsList(finalArr);
  };

  const hAttack = () => {
    let arr = [];
    let arrFinal = [];
    for (let i = 0; i < pokemonsList.length; i++) {
      arr.push(pokemonsList[i].attack);
    }
    let highestToLowest = arr.sort((a, b) => b - a);
    console.log(highestToLowest);
    const unique = Array.from(new Set(highestToLowest));

    for (let g = 0; g < unique.length; g++) {
      pokemonsList.forEach((e) => {
        if (e.attack === unique[g]) {
          arrFinal.push(e);
        }
      });
    }
    setPokemonsList(arrFinal);
  };

  const lAttack = () => {
    let arr = [];
    let arrFinal = [];
    for (let i = 0; i < pokemonsList.length; i++) {
      arr.push(pokemonsList[i].attack);
    }
    let highestToLowest = arr.sort((a, b) => a - b);
    console.log(highestToLowest);
    const unique = Array.from(new Set(highestToLowest));

    for (let g = 0; g < unique.length; g++) {
      pokemonsList.forEach((e) => {
        if (e.attack === unique[g]) {
          arrFinal.push(e);
        }
      });
    }
    setPokemonsList(arrFinal);
  };

  const listValue = (e, pokemons) => {
    const pokeValue = e.target.value;
    let arr = [];
    pokemons.forEach((d) => {
      for (let i = 0; i < d.types.length; i++) {
        if (d.types[i].type === pokeValue) {
          arr.push(d);
        }
      }
    });
    setPokemonsList(arr);
  };

  const resetPoke = () => {
    setPage(0);
    setPokemonsList(pokemons);
  };

  const inputF = (value) => {
    setInputState(value);
  };

  const searchDog = (e) => {
    e.preventDefault();
    const pokeSearch = pokemons.find((d) => d.name === inputState);
    if (pokeSearch) {
      setInputState("");
      setPokemonsList([pokeSearch]);
    } else {
      setInputState("");
      alert("Pokemon doesn't found");
      setPokemonsList(pokemons);
    }
  };

  useEffect(() => {
    setPokemonsList(pokemons);
  }, [pokemons]);
  return (
    <>
      <NavBar />

      <div className="searchBar">
        <button class="button-13" onClick={orderAZ}>
          A-Z
        </button>
        <button class="button-13" onClick={orderZA}>
          Z-A
        </button>
        <button class="button-13" onClick={hAttack}>
          STRONGEST
        </button>
        <button class="button-13" onClick={lAttack}>
          WEAKEST
        </button>
        <button class="button-13" onClick={resetPoke}>
          RESET
        </button>

        <select
          className="selectStyle"
          name="types"
          onChange={(e) => listValue(e, pokemons)}
        >
          <option value="">--Please choose an option--</option>
          {typesPoke.map((d) => (
            <option value={d.type}>{d.type}</option>
          ))}
        </select>

        <Input
          className="inputStyle"
          onClick={(e) => searchDog(e)}
          onChange={(value) => inputF(value)}
        />
      </div>

      <div>
        {pokemonUpdated.length > 0 ? (
          pokemonUpdated.map((d) => (
            <div className="cardPoke">
              <PokeCard
                key={d.id}
                name={d.name}
                image={d.image}
                type={validateType(d.types)}
                id={d.id}
              />
            </div>
          ))
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
      <button class="button-13" onClick={prevPage}>
        PREV
      </button>

      <button class="button-13" onClick={nextPage}>
        NEXT
      </button>
    </>
  );
};

export default Home;
