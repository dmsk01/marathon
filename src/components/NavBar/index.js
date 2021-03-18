import styles from "./styles.module.css";
import classNames from "classnames";

const NavBar = ({ onClick, isActive, bgActive = false }) => {
  return (
    <>
      <nav id={styles.navbar} className={classNames(styles.root, { [styles.bgActive]: bgActive })}>
        <div className={styles.navWrapper}>
          <p className={styles.brand}>LOGO</p>
          <div onClick={onClick} className={classNames(styles.menuButton, { [styles.active]: isActive })}>
            <span></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
