import { useState } from "react";
import { useHistory } from "react-router-dom";

import PokemonCard from "../../components/PokemonCard";

import POKEMONS from "../../pokemons";

import styles from "./style.module.css";

const GamePage = () => {
  const [cards, setCards] = useState(JSON.parse(JSON.stringify(POKEMONS)));

  const history = useHistory();

  const handleButtonClick = () => {
    history.push("/home");
  };

  const handleCardClick = (id) => {
    setCards(prevState=>prevState.map(
      item => item.id === id ? {
      ...item, active:!item.active}:item
    ))
  };
  return (
    <>
      <div className={styles.gameHeader}>
        <p>This is GamePage!!!</p>
        <button onClick={handleButtonClick}>Go to the Home page!</button>
      </div>
      <div className={styles.flex}>
        {cards.map((item) => (
          <PokemonCard isActive={item.active} onClick={handleCardClick} key={item.id} name={item.name} img={item.img} id={item.id} type={item.type} values={item.values} />
        ))}
      </div>
    </>
  );
};

export default GamePage;
