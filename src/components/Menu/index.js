import styles from "./styles.module.css";
import classNames from "classnames";

const Menu = ({ isActive }) => {
  const LINKS = ["welcome", "game", "about", "contact"]
  return (
    <>
      <div className={classNames(styles.menuContainer, { [styles.active]: isActive }, { [styles.deactive]: !isActive })}>
        <div className={styles.overlay}>
          <div className={styles.menuItems}>
            <ul>
              {LINKS.map((link) => {
                return(
                  <li>
                    <a href={`#${link}`}>{link.toUpperCase()}</a>
                  </li>)
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
