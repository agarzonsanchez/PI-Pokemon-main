import axios from "axios";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/pokemons");
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      return { error: "Page not found" };
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_TYPES",
        payload: json.data,
      });
    } catch (error) {
      return {
        error: "Page not found",
      };
    }
  };
};

export const postPokemon = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.post("http://localhost:3001/pokemons", payload);
      alert("Pokemon was created successfully");
      return json;
    } catch (error) {
      return { error: "Unexpected error" };
    }
  };
};

export const getQuery = (payload) => {
  return async (dispatch) => {
    try {
      const json = axios.get(`http://localhost:3001/pokemons?name=${payload}`);
      return dispatch({
        type: "GET_QUERY",
        payload: json.data,
      });
    } catch (error) {
      return {
        error: "Unepected error",
      };
    }
  };
};
