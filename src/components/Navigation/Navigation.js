import styles from "./navigation.module.css";
import PropTypes from "prop-types";

function Navigation({ position, children }) {
  return (
    <nav>
      <ul
        className={`${styles.navigation} 
      ${position === "right" ? styles.navigation_position_right : ""}
      `}
      >
        {children}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.string,
};

export default Navigation;
