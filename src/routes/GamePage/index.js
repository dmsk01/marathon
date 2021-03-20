import { useState, useEffect } from "react";

import database from "../../services/firebase";

import PokemonCard from "../../components/PokemonCard";

import styles from "./style.module.css";

const GamePage = () => {
  const [pokemons, setPokemons] = useState({}); //We get empty obj by default and then load if from firebase

  useEffect(() => {
    getPokemonsData();
  }, [pokemons]);

  function writeUserData(id, isActive) {
    database.ref("pokemons/" + id).update(
      {
        active: !isActive,
      },
      (error) => {
        if (error) {
          console.error(error);
        } else {
          //getPokemonsData();    //in this case remove dependencies from useEffect
          console.log("Data saved successfully!");
        }
      }
    );
  }

  function getPokemonsData() {
    database.ref("pokemons").once("value", (snapshot) => {
      setPokemons(snapshot.val());
    });
  }

  const handleCardClick = (id, isActive) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === id) {
          pokemon.active = isActive;
          writeUserData(item[0], pokemon.active);
        }
        acc[item[0]] = pokemon;
        return acc;
      }, {});
    });
  };
  return (
    <>
      <div className={styles.gameHeader}>
        <p>Choose the card!!!</p>
      </div>
      <div className={styles.flex}>
        {Object.entries(pokemons).map(([key, { name, img, id, type, values, active }]) => (
          <PokemonCard onClick={handleCardClick} isActive={active} key={key} keyId={key} name={name} img={img} id={id} type={type} values={values} />
        ))}
      </div>
      <div className={styles.gameHeader}>
        <button>Add new pokemon</button>
      </div>
    </>
  );
};

export default GamePage;
