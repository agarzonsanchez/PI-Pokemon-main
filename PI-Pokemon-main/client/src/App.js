import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import Home from "./components/Home/Home.jsx";
import CreatePoke from "./components/CreatePoke/CreatePoke";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPokemons, getTypes } from "./redux/actions";
import Details from "./components/Details/Details";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path={"/"} component={MainPage} />
        <Route path={"/pokemons"} />
        <Route path={"/home"} component={Home} />
        <Route path={"/Details/:id"} component={Details} />
        <Route path={"/createPokemon"} component={CreatePoke} />
      </BrowserRouter>
    </div>
  );
}

export default App;
