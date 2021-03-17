import styles from "./styles.module.css";
import classNames from "classnames";

const NavBar = ({ handelBurgerClick, isActive }) => {
  return (
    <>
      <nav className={styles.root}>
        <div className={styles.navWrapper}>
          <p className={styles.brand}>LOGO</p>
          <a onClick={handelBurgerClick} href="/#" className={classNames(styles.menuButton, { [styles.active]: isActive })}>
            <span></span>
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
