import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { PokemonContext } from "../../../../context/pokemonContext";
import { FireBaseContext } from "../../../../context/firebaseContext";

import Firebase from "../../../../services/firebase";

import PokemonCard from "../../../../components/PokemonCard";

import styles from "./style.module.css";

const FinishPage = () => {
  const [chosenCard, setChosenCard] = useState(null);
  const pokemonContext = useContext(PokemonContext);
  const firebase = useContext(FireBaseContext);
  const history = useHistory();

  const handleCardClick = (key) => {
    const pokemonAddToDatabase = { ...pokemonContext.player2Pokemons[key] };
    // setChosenCard((prevState) => {
    //   return {
    //     ...prevState,
    //     selected: !prevState.selected,
    //   };
    // });
    console.log(pokemonAddToDatabase);
    //firebase.addPokemon(pokemonAddToDatabase);
  };

  const handleClick = () => {
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
        <div>
          <button onClick={handleClick}>End Game</button>
        </div>
        <div>
          <div className={styles.flex}>
            {Object.entries(pokemonContext.player2Pokemons).map(([key, card]) => (
              <PokemonCard key={key} keyId={key} name={card.name} img={card.img} id={card.id} type={card.type} values={card.values} active={true} className={styles.card} selected={false} onClickCard={handleCardClick()} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinishPage;
