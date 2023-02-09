import styles from "./main-content.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngedients from "../BurgerIngedients/BurgerIngedients";

function MainContent({  ingredients, components }) {
  return (
    <main className={styles.main_container}>
      <div className={styles.content}>
        <BurgerIngedients ingredients={ingredients} />
        <BurgerConstructor components={components} />
      </div>
    </main>
  );
}

MainContent.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  components: PropTypes.arrayOf(ingredientType).isRequired,
};

export default MainContent;
