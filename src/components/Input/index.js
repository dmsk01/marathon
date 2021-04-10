import styles from "./styles.module.css";

const Input = ({ value, label, type = "text", name, onChange, required }) => {
  return (
    <div className={styles.root}>
      <input name={name} value={value} onChange={onChange} type={type} className={styles.input} required={required} />
      <span className={styles.highlight} />
      <span className={styles.bar} />
      <label className={styles.label}>{label.toUpperCase()}</label>
    </div>
  );
};

export default Input;
