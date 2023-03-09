import styles from "./menu.module.css";
import { Link, NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav>
      <ul className={`${styles.navigation}`}>
        <li className={`${styles.navigation_link}`}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? `${styles.link_name_active} text text_type_main-medium`
                : `${styles.link_name} text text_type_main-medium text_color_inactive`
            }
          >
            Профиль
          </NavLink>
        </li>

        <li className={styles.navigation_link}>
          <NavLink
            to="/order-history"
            className={({ isActive }) =>
              isActive
                ? `${styles.link_name_active} text text_type_main-medium`
                : `${styles.link_name} text text_type_main-medium text_color_inactive`
            }
          >
            История
          </NavLink>
        </li>
        <li className={styles.navigation_link}>
          <Link to="/order-history" className={styles.link_name}>
            <p className="text text_type_main-medium text_color_inactive">
              Выход
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
