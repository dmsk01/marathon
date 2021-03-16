import styles from "./style.module.css";
import classNames from "classnames";

const Layout = ({ urlBg, colorBg, title, children }) => {
  const sectionStyle = {};

  if (urlBg) {
    sectionStyle.backgroundImage = `url(${urlBg})`;
  }

  if (colorBg) {
    sectionStyle.backgroundColor = colorBg;
  }

  return (
    <section className={styles.root} style={sectionStyle}>
      <div className={styles.wrapper}>
        <article>
          <div className={styles.title}>
            <h3>{title ? title : null}</h3>
            <span className={styles.separator} />
          </div>
          <div className={classNames(styles.desc, styles.full)}>{children ? children : null}</div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
