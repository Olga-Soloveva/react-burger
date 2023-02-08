import styles from "./ingredient-item.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientItem({ ingredient, showIngredientDetails }) {
  const { name, image, price } = ingredient;

  const handleIngredient = () => {
    showIngredientDetails(ingredient);
  };
  return (
    <div className={styles.container} onClick={handleIngredient}>
      <img src={image} alt={name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{price}</p>{" "}
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`text text_type_main-default ${styles.name}`}>{name}</h3>
      <Counter count={1} size="default" extraClass={`m-1 ${styles.counter}`} />
    </div>
  );
}

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientItem;
