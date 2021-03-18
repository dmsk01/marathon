import { useState } from "react";

import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive((prevState) => !prevState);
  };

  return (
    <>
      <NavBar onClick={handleClick} isActive={isActive} bgActive={bgActive} />
      <Menu isActive={isActive} onClick={handleClick} />
    </>
  );
};

export default MenuHeader;
