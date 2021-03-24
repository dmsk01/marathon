import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAux8IGOJZFxByxV9jY66v2raWg2Xk7vk8",
  authDomain: "pokemon-game-7a8f8.firebaseapp.com",
  databaseURL: "https://pokemon-game-7a8f8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-7a8f8",
  storageBucket: "pokemon-game-7a8f8.appspot.com",
  messagingSenderId: "946688881926",
  appId: "1:946688881926:web:566d3d92e21bc3451b1a87",
};

firebase.initializeApp(firebaseConfig);
class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSoket = (callback) => {
    this.database.ref("pokemons").on("value", (snapshot) => {
      callback(snapshot.val());
    });
  };

  offPokemonSoket = () => {
    this.database.ref("pokemons").off();
  };

  getPokemonsOnce = async () => {
    return await this.database
      .ref("pokemons")
      .once("value")
      .then((snapshot) => snapshot.val());
  };

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  };

  addPokemon = (data, callback) => {
    const newCardKey = this.database.ref().child("pokemons").push().key;
    this.database
      .ref("pokemons/" + newCardKey)
      .set(data)
      .then(() => {
        callback && callback();
      });
  };
}

export default Firebase;
