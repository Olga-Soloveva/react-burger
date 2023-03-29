import styles from "./navigation.module.css";
import React, { FC } from "react";

interface INavigation {
  position: "right" | "left";
  children: React.ReactNode;
}

const Navigation: FC<INavigation> = ({ position = "left", children }) => {
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
};

export default React.memo(Navigation);
