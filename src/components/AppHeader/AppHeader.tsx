import styles from "./app-header.module.css";
import React from "react";
import Navigation from "../Navigation/Navigation";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useMatch } from "react-router-dom";
import { ROUTE_MAIN, ROUTE_PROFILE, ROUTE_FEED } from "../../utils/сonstant";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = React.memo(() => {
  const isMainPage = !!useMatch(ROUTE_MAIN);
  const isOrderFeedPage = !!useMatch(ROUTE_FEED);
  const isProfilePage = !!useMatch(ROUTE_PROFILE);

  return (
    <header className={styles.header}>
      <div className={`${styles.content} pb-4 pt-4`}>
        <Navigation position={"left"}>
          <NavigationLink linkName={"Конструктор"} linkPath={ROUTE_MAIN}>
            <BurgerIcon type={isMainPage ? "primary" : "secondary"} />
          </NavigationLink>
          <NavigationLink linkName={"Лента заказов"} linkPath={ROUTE_FEED}>
            <ListIcon type={isOrderFeedPage ? "primary" : "secondary"} />
          </NavigationLink>
        </Navigation>
        <Logo />
        <Navigation position={"right"}>
          <NavigationLink linkName={"Личный кабинет"} linkPath={ROUTE_PROFILE}>
            <ProfileIcon
              type={isProfilePage ? "primary" : "secondary"}
            />
          </NavigationLink>
        </Navigation>
      </div>
    </header>
  );
});

export default AppHeader;
