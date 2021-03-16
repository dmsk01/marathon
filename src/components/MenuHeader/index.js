import { useState } from "react";

import Menu from "../Menu";
import NavBar from "../NavBar";

const MenuHeader = () => {
  const [isActive, setActive] = useState(false);

  const handleClick = () => {
    setActive(!isActive);
  };

  return (
    <>
      <NavBar handelBurgerClick={handleClick} isActive={isActive} />
      <Menu isActive={isActive} />
    </>
  );
};

export default MenuHeader;
