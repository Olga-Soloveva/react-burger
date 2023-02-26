import styles from "./main-content.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngedients from "../BurgerIngedients/BurgerIngedients";

function MainContent() {
  return (
    <main className={styles.main_container}>
      <div className={styles.content}>
        <BurgerIngedients />
        <BurgerConstructor />
      </div>
    </main>
  );
}

export default MainContent;
