import { useState } from "react";

import POKEMONS from "../../pokemons";

const GamePage = ({ onChangePage }) => {
  const copiedPokemons = JSON.parse(JSON.stringify(POKEMONS));
  const [cards, setcards] = useState(copiedPokemons);

  const handleClick = () => {
    onChangePage && onChangePage("app");
  };
  return (
    <>
      <div>
        This is AboutPage!!!
        <button onClick={handleClick}>Go to the Home page!</button>
      </div>
    </>
  );
};

export default GamePage;
