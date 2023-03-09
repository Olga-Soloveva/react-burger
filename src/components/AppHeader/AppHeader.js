import styles from "./app-header.module.css";
import React from "react";
import Navigation from "../Navigation/Navigation";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useLocation } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = React.memo((props) => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className={`${styles.content} pb-4 pt-4`}>
        <Navigation position={"left"}>
          <NavigationLink linkName={"Конструктор"} linkPath='/'>
            <BurgerIcon type={location.pathname === '/' ? "primary" : "secondary" } />
          </NavigationLink>
          <NavigationLink linkName={"Лента заказов"} linkPath='/orders'>
            <ListIcon type={location.pathname === '/orders' ? "primary" : "secondary" } />
          </NavigationLink>
        </Navigation>
        <Logo />
        <Navigation position={"right"}>
          <NavigationLink linkName={"Личный кабинет"} linkPath='/profile'>
            <ProfileIcon type={location.pathname === '/profile' ? "primary" : "secondary" }  />
          </NavigationLink>
        </Navigation>
      </div>
    </header>
  );
});

export default AppHeader;
