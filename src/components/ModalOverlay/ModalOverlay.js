import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({onClickOverlay, children}) => {
  return <div className={styles.modalOverlay} onClick={onClickOverlay}>{children}</div>;
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClickOverlay: PropTypes.func.isRequired,
};

export default ModalOverlay;
