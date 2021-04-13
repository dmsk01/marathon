import { useState } from "react";
import { NotificationManager } from "react-notifications";

import Menu from "../Menu";
import Modal from "../Modal";
import NavBar from "../NavBar";
import LoginForm from "../LoginForm";

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setActive((prevState) => !prevState);
  };

  const handleClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleSubmitLoginForm = async ({ email, password, isSignIn }) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };

    const sighUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAux8IGOJZFxByxV9jY66v2raWg2Xk7vk8";
    const sighInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAux8IGOJZFxByxV9jY66v2raWg2Xk7vk8";

    const urlToFetch = isSignIn ? sighInUrl : sighUpUrl;

    const messageToNotify = isSignIn ? "You successfully logged in!" : "Congratulations! Your account has been successfully created.";

    const response = await fetch(urlToFetch, requestOptions).then((res) => res.json());

    if (response.hasOwnProperty("error")) {
      NotificationManager.error(response.error.message, "Correct your data!");
    } else {
      if (!isSignIn) {
        //if Sing up mode we should give a starter pokemons set to a new user
        console.log("register");
        const pokemonStart = await fetch("https://reactmarathon-api.herokuapp.com/api/pokemons/starter").then((res) => res.json());

        for (const item of pokemonStart.data) {
          await fetch(`https://pokemon-game-7a8f8-default-rtdb.europe-west1.firebasedatabase.app/${response.localId}/pokemons.json?auth=${response.idToken}`, {
            method: "POST",
            body: JSON.stringify(item),
          });
        }
      }
      localStorage.setItem("idToken", response.idToken);
      NotificationManager.success(messageToNotify);
      handleClickLogin();
    }
  };

  return (
    <>
      <Menu isActive={isActive} onClick={handleClick} />
      <NavBar onClick={handleClick} onClickLogin={handleClickLogin} isActive={isActive} bgActive={bgActive} />
      <Modal isOpen={isOpenModal} title="Log in" onCloseModal={handleClickLogin}>
        <LoginForm isOpenModal={isOpenModal} onSubmit={handleSubmitLoginForm} />
      </Modal>
    </>
  );
};

export default MenuHeader;
