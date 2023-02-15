import styles from "./app-header.module.css";
import React from "react";
import Navigation from "../Navigation/Navigation";
import NavigationLink from "../NavigationLink/NavigationLink";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = React.memo((props) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.content} pb-4 pt-4`}>
        <Navigation position={"left"}>
          <NavigationLink linkName={"Конструктор"} isLinkActive={true}>
            <BurgerIcon type="primary" />
          </NavigationLink>
          <NavigationLink linkName={"Лента заказов"} isLinkActive={false}>
            <ListIcon type="secondary" />
          </NavigationLink>
        </Navigation>
        <Logo />
        <Navigation position={"right"}>
          <NavigationLink linkName={"Личный кабинет"} isLinkActive={false}>
            <ProfileIcon type="secondary" />
          </NavigationLink>
        </Navigation>
      </div>
    </header>
  );
});

export default AppHeader;
