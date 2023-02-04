import styles from "./main-content.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngedients from "../BurgerIngedients/BurgerIngedients";

function MainContent({ components, ingredients }) {
  return (
    <main className={styles.main_container}>
      <div className={styles.content}>
        <BurgerIngedients ingredients={ingredients} />
        <BurgerConstructor components={components} />
      </div>
    </main>
  );
}

export default MainContent;
