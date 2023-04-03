import styles from "./ingredient-item.module.css";
import React, {FC} from "react";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, Link } from "react-router-dom";
import { selectedIngredientSlice } from "../../services/reducers/selectedIngredient";
import { useDispatch } from "react-redux";
import { TIngredient } from "../../utils/types";

interface IIngredientItem {
  ingredient: TIngredient;
  count?: number
}

const IngredientItem: FC<IIngredientItem> = ({ ingredient, count }) => {
  const { _id: ingredientId, name, image, price } = ingredient;
  const location = useLocation();
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  const { addIngredientDetails } = selectedIngredientSlice.actions;

  const handleIngredient = () => {
    dispatch(addIngredientDetails(ingredient));
  };

  return (
    <Link
      to={{
        pathname: `/ingredients/${ingredientId}`,
      }}
      state={{ background: location, ingredient: ingredient }}
      className={styles.link}
    >
      <div
        className={styles.container}
        ref={dragRef}
        onClick={handleIngredient}
      >
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

export default React.memo(IngredientItem);
