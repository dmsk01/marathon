import styles from "./styles.module.css";

const Input = ({ value,label, type = "text", name, onChange, required }) => {
  return (
    <div className={styles.root}>
      <input type={type} className={styles.input} required={required} />
      <span className={styles.highlight} />
      <span className={styles.bar} />
      <label className={styles.label}>{name.toUpperCase()}</label>
    </div>
  );
};

export default Input;
