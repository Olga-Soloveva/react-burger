import styles from "./app-header.module.css";
import React from "react";
import Navigation from "../Navigation/Navigation";
import NavigationLink from "../NavigationLink/NavigationLink";
import { useMatch } from "react-router-dom";
import { ROUTE_MAIN, ROUTE_PROFILE, ROUTE_FEED, ROUTE_ORDER } from "../../utils/сonstant";

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
  const isOrderHistoryPage = !!useMatch(`${ROUTE_PROFILE}${ROUTE_ORDER}`) ;

  return (
    <header className={styles.header}>
      <div className={`${styles.content} pb-4 pt-4`}>
        <Navigation position={"left"}>
          <NavigationLink linkName={"Конструктор"} linkPath={ROUTE_MAIN} isActiveLink={isMainPage}>
            <BurgerIcon type={isMainPage ? "primary" : "secondary"} />
          </NavigationLink>
          <NavigationLink linkName={"Лента заказов"} linkPath={ROUTE_FEED} isActiveLink={isOrderFeedPage}>
            <ListIcon type={isOrderFeedPage ? "primary" : "secondary"} />
          </NavigationLink>
        </Navigation>
        <Logo />
        <Navigation position={"right"}>
          <NavigationLink linkName={"Личный кабинет"} linkPath={ROUTE_PROFILE} isActiveLink={isProfilePage || isOrderHistoryPage}>
            <ProfileIcon
              type={isProfilePage || isOrderHistoryPage ? "primary" : "secondary"}
            />
          </NavigationLink>
        </Navigation>
      </div>
    </header>
  );
});

export default AppHeader;
