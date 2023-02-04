import appHeader from "./app-header.module.css";
import Navigation from "../Navigation/Navigation";
import NavigationLink from "../NavigationLink/NavigationLink";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={appHeader.header}>
      <div className={`${appHeader.content} pb-4 pt-4`}>
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
}

export default AppHeader;
