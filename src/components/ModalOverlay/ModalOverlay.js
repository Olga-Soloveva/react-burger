import styles from "./modal-overlay.module.css";

const ModalOverlay = ({onClickOverlay, children}) => {
  return <div className={styles.modalOverlay} onClick={onClickOverlay}>{children}</div>;
}

export default ModalOverlay;
