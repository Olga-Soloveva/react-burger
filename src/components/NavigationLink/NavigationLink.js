import styles from "./navigation-link.module.css";

function NavigationLink({ linkName, isLinkActive, children }) {
  return (
    <li className={`${styles.navigation_link}  pr-5 pl-5`}>
      {children}
      <a
        className={`${styles.link_name} 
        ${
          !isLinkActive ? styles.link_name_inactive : ""
        } text text_type_main-default pl-2`}
        href="/"
      >
        {linkName}
      </a>
    </li>
  );
}

export default NavigationLink;
