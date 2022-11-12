const initialState = {
  allPokemons: [],
  copyAllPokemons: [],
  types: [],
  pokemonDetails: [],
  pokemonsWeight: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "GET_QUERY":
      return {
        ...state,
        pokemonDetails: action.payload,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

export { rootReducer };
