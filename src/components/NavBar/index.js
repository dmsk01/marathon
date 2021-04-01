import styles from "./styles.module.css";
import classNames from "classnames";
import logo from "../../assets/Pokemon_logo.png";

import { ReactComponent as LoginSVG } from "../../assets/login.svg";

const NavBar = ({ onClick, isActive, bgActive = false, onClickLogin }) => {
  return (
    <>
      <nav id={styles.navbar} className={classNames(styles.root, { [styles.bgActive]: bgActive })}>
        <div className={styles.navWrapper}>
          <div className={styles.brand}>
            <img src={logo} alt="logo" />
          </div>
          <div className={styles.loginAndMenu}>
            <div className={styles.loginWrap} onClick={onClickLogin}>
              <LoginSVG />
            </div>
            <div onClick={onClick} className={classNames(styles.menuButton, { [styles.active]: isActive })}>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
