import styles from "./navigation-link.module.css";
import React, { FC } from "react";
import { Link } from "react-router-dom";

interface INavigationLink {
  linkName: string;
  linkPath: string;
  isActiveLink: boolean;
  children?: React.ReactNode;
}

const NavigationLink: FC<INavigationLink> = ({
  linkName,
  linkPath,
  isActiveLink,
  children,
}) => {

  return (
    <li className={`${styles.navigation_link}  pr-5 pl-5`}>
      {children}
      <Link
        to={linkPath}
        className={`${styles.link_name} 
        ${
          !isActiveLink ? styles.link_name_inactive : ""
        } text text_type_main-default pl-2`}
      >
        {linkName}
      </Link>
    </li>
  );
};

export default React.memo(NavigationLink);
