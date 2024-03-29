import { ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_ORDER } from "../../utils/сonstant";
import React from "react";
import styles from "./menu.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "../../utils/hooks";
import { onLogOut } from "../../services/actions/users";
import { userSlice } from "../../services/reducers/users";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearUser } = userSlice.actions;

  function handlelogOut() {
    dispatch(onLogOut())
      .unwrap()
      .then(() => {
        navigate(ROUTE_LOGIN);
      })
      .catch((err: any) => {
        dispatch(clearUser());
      })
      .finally(() => {
        navigate(ROUTE_LOGIN);
      });
  }

  return (
    <nav>
      <ul className={`${styles.navigation}`}>
        <li className={`${styles.navigation_link}`}>
          <NavLink
            to={ROUTE_PROFILE}
            className={({ isActive }) =>
              isActive
                ? `${styles.link_name_active} text text_type_main-medium`
                : `${styles.link_name} text text_type_main-medium text_color_inactive`
            }
            end
          >
            Профиль
          </NavLink>
        </li>

        <li className={styles.navigation_link}>
          <NavLink
            to={`${ROUTE_PROFILE}${ROUTE_ORDER}`}
            className={({ isActive }) =>
              isActive
                ? `${styles.link_name_active} text text_type_main-medium`
                : `${styles.link_name} text text_type_main-medium text_color_inactive`
            }
            end
          >
            История заказов
          </NavLink>
        </li>
        <li className={styles.navigation_link}>
          <button className={styles.button} onClick={handlelogOut}>
            <p className="text text_type_main-medium text_color_inactive">
              Выход
            </p>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Menu);
