import styles from "./ingredient-item.module.css";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, Link } from "react-router-dom";

function IngredientItem({ ingredient, count, showIngredientDetails  }) {
  const { _id: ingredientId, name, image, price } = ingredient;
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const handleIngredient = () => {
    showIngredientDetails(ingredient);
  };

  return (
    <Link
      to={{
        pathname: `/ingredients/${ingredientId}`,
      }}
      state= {{ background: location }}
      className={styles.link}
    >
      <div className={styles.container} ref={dragRef} onClick={handleIngredient}>
        <img src={image} alt={name} />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{price}</p>{" "}
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`text text_type_main-default ${styles.name}`}>{name}</h3>
        {count && (
          <Counter
            count={count}
            size="default"
            extraClass={`m-1 ${styles.counter}`}
          />
        )}
      </div>
    </Link>
  );
}

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired,
  count: PropTypes.number,
};

export default IngredientItem;
