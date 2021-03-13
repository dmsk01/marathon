import styles from "./style.module.css";

const Layout = ({ urlBg, colorBg, descr, title }) => {
  return (
    <section className={styles.root} style={{ background: `${urlBg ? `url(${urlBg})` : colorBg ? colorBg : "#e3e3e3"}` }}>
      <div className={styles.wrapper}>
        <article>
          <div className={styles.title}>
            <h3>{title ? title : null}</h3>
            <span className={styles.separator} />
          </div>
          <div className={(styles.desc, styles.full)}>
            <p>{descr ? descr : null}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
