import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import PokemonCard from "../../../../components/PokemonCard";

import styles from "./style.module.css";
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const [pokemons, setPokemons] = useState({}); //We get empty obj by default and then load if from firebase
  const pokemonContext = useContext(PokemonContext);
  const history = useHistory();

  useEffect(() => {
    
    firebase.getPokemonSoket((pokemons) => {
      setPokemons(pokemons);
    });

    return () => {
      firebase.offPokemonSoket();
    };
  }, []);

  const handleCardClick = (key) => {
    const pokemon = { ...pokemons[key] };
    pokemonContext.onSelectedPokemons(key, pokemon);
    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  const handleStartGameClick = () => {
    history.push("/game/board");
  };

  return (
    <>
      <div className={styles.gameHeader}>
        <p>Choose the card!!!</p>
      </div>
      <div className={styles.buttonWrap}>
        <button disabled={Object.keys(pokemonContext.pokemons).length < 5} onClick={handleStartGameClick}>
          Start Game
        </button>
      </div>
      <div className={styles.flex}>
        {Object.entries(pokemons).map(([key, { name, img, id, type, values, selected, minimize }]) => (
          <PokemonCard
            key={key}
            keyId={key}
            name={name}
            img={img}
            id={id}
            type={type}
            values={values}
            active={true}
            isSelected={selected}
            minimize={minimize}
            className={styles.card}
            onClickCard={() => {
              if (Object.keys(pokemonContext.pokemons).length < 5 || selected) {
                handleCardClick(key);
              }
            }}
          />
        ))}
      </div>
    </>
  );
};

export default StartPage;
