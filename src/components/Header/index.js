import styles from "./style.module.css";

const Header = (props) => {
  return (
    <header className={styles.root}>
      <div className={styles.forest} />
      <div className={styles.container}>
        <h1>{props.title}</h1>
        <p>{props.descr}</p>
      </div>
    </header>
  );
};

export default Header;
