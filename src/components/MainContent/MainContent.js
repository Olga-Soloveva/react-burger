import styles from "./main-content.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
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

BurgerConstructor.propTypes = {
  components: PropTypes.arrayOf(ingredientType).isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};

export default MainContent;
