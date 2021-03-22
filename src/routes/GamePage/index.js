import { useState, useEffect } from "react";

import database from "../../services/firebase";

import PokemonCard from "../../components/PokemonCard";

import styles from "./style.module.css";

const GamePage = () => {
  const [pokemons, setPokemons] = useState({}); //We get empty obj by default and then load if from firebase

  useEffect(() => {
    getPokemonsData();
  }, []);

  function writePokemonData(keyId, active) {
    database.ref("pokemons/" + keyId).update(
      {
        active: !active,
      },
      (error) => {
        if (error) {
          console.error(error);
        } else {
          //getPokemonsData();

          console.log("Data saved successfully!");
        }
      }
    );
  }

  function getPokemonsData() {
    database.ref("pokemons").on("value", (snapshot) => {
      setPokemons(snapshot.val());
    });
  }

  const handleCardClick = (keyId, isActive) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (item[0] === keyId) {
          pokemon.active = isActive;
          writePokemonData(item[0], isActive);
        }
        acc[item[0]] = pokemon;
        return acc;
      }, {});
    });
  };

  function createNewPokemon() {
    const randomCardIndex = Math.trunc(Math.random() * Object.keys(pokemons).length);
    const randomCard = { ...Object.values(pokemons)[randomCardIndex] };
    randomCard.active = false;
    return randomCard;
  }

  function addPokemonToDatabase() {
    const card = createNewPokemon();

    const newCardKey = database.ref().child("pokemons").push().key;

    let dataToCreate = {};
    dataToCreate[newCardKey] = card;

    database.ref("pokemons").update(dataToCreate, (error) => {
      if (error) {
        console.error(error);
      } else {
        //getPokemonsData(); //in this case remove dependencies from useEffect
        console.log("Pokemon added successfully!");
      }
    });
  }

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
        <button onClick={addPokemonToDatabase}>Add new pokemon</button>
      </div>
    </>
  );
};

export default GamePage;
