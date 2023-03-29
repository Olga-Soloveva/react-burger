import styles from "./modal-overlay.module.css";
import React, { FC } from "react";
import { TMouseEvent } from "../../utils/types";

interface IModalOverlay {
  onClickOverlay: TMouseEvent;
  children: React.ReactNode;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClickOverlay, children }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClickOverlay}>
      {children}
    </div>
  );
};

export default React.memo(ModalOverlay);
