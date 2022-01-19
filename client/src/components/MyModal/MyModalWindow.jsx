import React from "react";
import { bool, func, node } from "prop-types";
import styles from "./MyModalWindow.module.scss";

function MyModalWindow({ show, setShow, children }) {
  return (
    <div
      className={show ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setShow(false)}
    >
      <div
        className={show ? `${styles.content} ${styles.active}` : styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default MyModalWindow;
