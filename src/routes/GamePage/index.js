import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";

import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import StartPage from "./routes/Start";

import { PokemonContext } from "../../context/pokemonContext";
import { useState } from "react";

const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});
  const [gameStatus, setGameStatus] = useState(null);
  const [receivedPlayer2Pokemons, setReceivedPlayer2Pokemons] = useState({});

  const match = useRouteMatch();

  const handleSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];
        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };

  const handleReceivedPokemon = (pokemons) => {
    setReceivedPlayer2Pokemons(() => {
      return {
        ...pokemons,
      };
    });
  };

  const handleSetWin = (status) => {
    setGameStatus(status);
  };

  const handleClearContext = () => {
    setSelectedPokemons({});
    setReceivedPlayer2Pokemons({});
    setGameStatus(null);
  };
  return (
    <PokemonContext.Provider
      value={{
        pokemons: selectedPokemons,
        onSelectedPokemons: handleSelectedPokemons,
        player2Pokemons: receivedPlayer2Pokemons,
        onReceivePokemons: handleReceivedPokemon,
        onClearContext: handleClearContext,
        isWin: gameStatus,
        onWin: handleSetWin,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;
