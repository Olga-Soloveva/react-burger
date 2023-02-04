import styles from "./navigation.module.css";

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

export default Navigation;
