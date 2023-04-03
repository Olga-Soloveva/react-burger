import styles from "./modal.module.css";
import React, { useEffect, useCallback, FC } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TMouseEvent } from "../../utils/types";

interface IModal {
  title?: string | null;
  onClose: () => void;
  children?: React.ReactNode;
}

const modalRoot = document.getElementById("react-modals");

const Modal: FC<IModal> = ({ title, onClose, children }) => {
  useEffect(() => {
    const closeByEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  const handleOverlay = useCallback<TMouseEvent>(
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
        {title && (
          <h2 className={`text text_type_main-large ${styles.title} mt-10`}>
            {title}
          </h2>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot as HTMLElement
  );
};

export default Modal;
