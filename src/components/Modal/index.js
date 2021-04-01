import { useRef, useEffect } from "react";

import classNames from "classnames";
import styles from "./styles.module.css";

const Modal = ({ isOpen, title, children, onCloseModal }) => {
  const modalEl = useRef();

  useEffect(() => {
    document.querySelector("body").style.overflow = isOpen ? "hidden" : null;
  }, [isOpen]);

  const handleCloseModal = () => {
    onCloseModal && onCloseModal(false);
  };

  const handleClickRoot = (event) => {
    if (!modalEl.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  return (
    <div onClick={handleClickRoot} className={classNames(styles.root, { [styles.open]: isOpen })}>
      <div ref={modalEl} className={styles.modal}>
        <div className={styles.head}>
          {title}
          <span className={styles.btnClose} onClick={handleCloseModal}></span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
