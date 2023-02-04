import style from "./navigation.module.css";

function Navigation({ position, children }) {
  return (
    <nav>
      <ul
        className={`${style.navigation} 
      ${position === "right" ? style.navigation_position_right : ""}
      `}
      >
        {children}
      </ul>
    </nav>
  );
}

export default Navigation;
