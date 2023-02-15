import styles from "./main-content.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngedients from "../BurgerIngedients/BurgerIngedients";

function MainContent({  ingredients }) {
  return (
    <main className={styles.main_container}>
      <div className={styles.content}>
        <BurgerIngedients ingredients={ingredients} />
        <BurgerConstructor components={ingredients} />
      </div>
    </main>
  );
}

MainContent.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};

export default MainContent;
