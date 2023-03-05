import styles from "./ingredient-item.module.css";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientItem({ ingredient, showIngredientDetails, count }) {
  const { name, image, price } = ingredient;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const handleIngredient = () => {
    showIngredientDetails(ingredient);
  };

  return (
    <div className={styles.container} onClick={handleIngredient} ref={dragRef}>
      <img src={image} alt={name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{price}</p>{" "}
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`text text_type_main-default ${styles.name}`}>{name}</h3>
      {count && (<Counter
        count={count}
        size="default"
        extraClass={`m-1 ${styles.counter}`}
      />)}
    </div>
  );
}

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired,
  showIngredientDetails: PropTypes.func.isRequired,
};

export default IngredientItem;
