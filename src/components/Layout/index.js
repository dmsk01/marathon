import styles from "./style.module.css";

const Layout = (props) => {
  return (
    <section className={styles.root} style={{ background: `${props.urlBg ? `url(${props.urlBg})` : props.colorBg}` }}>
      <div className={styles.wrapper}>
        <article>
          <div className={styles.title}>
            <h3>{props.title}</h3>
            <span className={styles.separator} />
          </div>
          <div className={(styles.desc, styles.full)}>
            <p>{props.descr}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
