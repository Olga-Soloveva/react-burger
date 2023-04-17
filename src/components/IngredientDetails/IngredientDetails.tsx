import styles from "./ingredient-details.module.css";
import React, {FC} from "react";
import { useSelector } from "../../utils/hooks";
import { TIngredient } from "../../utils/types";

interface IIngredientDetails {
  ingredient: TIngredient;
}

const IngredientDetails: FC<IIngredientDetails> = ({ ingredient }) => {
  const ingredientStore = useSelector((store) => store.selectedIngredient)

  const { name, image_large, calories, proteins, fat, carbohydrates } =
  ingredient || ingredientStore || {};

  return (
    <>
      <img src={image_large} alt={name} className={styles.image} />
      <h3 className={`text text_type_main-medium mt-4 mb-8 ${styles.title}`}>
        {name}
      </h3>
      <div className={`${styles.nutrition_container} mb-15`}>
        <div className={styles.nutrition_item}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </div>
        <div className={styles.nutrition_item}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </div>
        <div className={styles.nutrition_item}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </div>
        <div className={styles.nutrition_item}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
};

export default React.memo(IngredientDetails);
