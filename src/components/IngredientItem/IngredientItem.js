import styles from "./ingredient-item.module.css";
import { useMemo } from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import { useSelector } from "react-redux";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientItem({ ingredient, showIngredientDetails }) {
  const { _id, name, image, price, type } = ingredient;
  const { bunComponent, otherComponents } = useSelector(
    (store) => store.components
  );
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const count = useMemo(() => {
    if (type === "bun" && _id === bunComponent?._id) {
      return 2;
    } else {
      const a = otherComponents.filter((component) => {
        return component._id === _id;
      });
      return a.length;
    }
    // if (components.length > 0) {
    //   const a = components.filter((component) => {
    //     return component._id === _id;
    //   });
    //   return a.length;
    // }
  }, [bunComponent, otherComponents, _id, type]);

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
      <Counter
        count={count}
        size="default"
        extraClass={`m-1 ${styles.counter}`}
      />
    </div>
  );
}

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired,
  showIngredientDetails: PropTypes.func.isRequired,
};

export default IngredientItem;
