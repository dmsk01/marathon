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

  const handleSubmitLoginForm = async ({ email, password }) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };
    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAux8IGOJZFxByxV9jY66v2raWg2Xk7vk8", requestOptions).then((res) => res.json());

    if (response.hasOwnProperty("error")) {
      NotificationManager.error(response.error.message, "Correct your data!");
    } else {
      localStorage.setItem("idToken", response.idToken);
      NotificationManager.success("You successfully logged in");
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
