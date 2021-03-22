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

export const fire = firebase;
export const database = fire.database();

export default database;
