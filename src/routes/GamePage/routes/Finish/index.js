import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { PokemonContext } from "../../../../context/pokemonContext";
import { FireBaseContext } from "../../../../context/firebaseContext";

import PokemonCard from "../../../../components/PokemonCard";

import styles from "./style.module.css";

const FinishPage = () => {
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const pokemonContext = useContext(PokemonContext);
  const firebase = useContext(FireBaseContext);
  const history = useHistory();

  const handleCardClick = (key) => {
    const pokemonToAdd = { ...pokemonContext.player2Pokemons[key] };
    setSelectedPokemon({
      ...pokemonToAdd,
      isSelected: !pokemonToAdd.isSelected,
    });
  };

  const handleEndGame = () => {
    pokemonContext.isWin === "win" && selectedPokemon && firebase.addPokemon(selectedPokemon);
    pokemonContext.onClearContext();
    history.push("/game");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.flex}>
          {Object.entries(pokemonContext.pokemons).map(([key, { name, img, id, type, values }]) => (
            <PokemonCard key={key} keyId={key} name={name} img={img} id={id} type={type} values={values} active={true} className={styles.card} />
          ))}
        </div>
        <div className={styles.endGame}>
          {pokemonContext.isWin === "win" && <p>Choose one enemy card to capture</p>}
          <button onClick={handleEndGame}>End Game</button>
        </div>
        <div>
          <div className={styles.flex}>
            {Object.entries(pokemonContext.player2Pokemons).map(([key, card]) => (
              <PokemonCard key={key} keyId={key} name={card.name} img={card.img} id={card.id} type={card.type} values={card.values} active={true} className={styles.card} isSelected={selectedPokemon.id ? selectedPokemon.id === card.id : false} onClickCard={handleCardClick} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinishPage;
