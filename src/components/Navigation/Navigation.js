import style from "./navigation.module.css";

function Navigation({ isPositionRight, children }) {
  return (
    <nav>
      <ul
        className={`${style.navigation} 
      ${isPositionRight ? style.navigation_position_right : ""}
      `}
      >
        {children}
      </ul>
    </nav>
  );
}

export default Navigation;
