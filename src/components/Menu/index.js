import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import classNames from "classnames";

const Menu = ({ onClick, isActive }) => {
  const LINKS = [
    { title: "HOME", to: "/" },
    { title: "GAME", to: "game" },
    { title: "ABOUT", to: "about" },
    { title: "CONTACT", to: "contact" },
  ];
  return (
    <>
      <div className={classNames(styles.menuContainer, { [styles.active]: isActive === true, [styles.deactive]: isActive === false })}>
        <div className={styles.overlay}>
          <div className={styles.menuItems}>
            <ul>
              {LINKS.map(({ title, to }, index) => {
                return (
                  <li key={index}>
                    <Link onClick={onClick} to={to}>
                      {title.toUpperCase()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
