import styles from "./modal.module.css";
import { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  const handleOverlay = useCallback(
    (evt) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return ReactDOM.createPortal(
    <ModalOverlay onClickOverlay={handleOverlay}>
      <div className={`${styles.modal} pl-10 pr-10`}>
        <button className={styles.buttonClose} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {title && <h2 className={`text text_type_main-large ${styles.title} mt-10`}>
          {title}
        </h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
