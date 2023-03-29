import styles from "./ingredients-type.module.css";
import React, { FC } from "react";
import IngredientItem from "../IngredientItem/IngredientItem";
import { TIngredient, TingredientsCounter } from "../../utils/types";

interface IIngredientsType {
  ingredientsThisType: TIngredient[];
  typeName: string;
  idElement: string;
  ingredientsCounter: TingredientsCounter;
}

const IngredientsType: FC<IIngredientsType> = ({
  ingredientsThisType,
  typeName,
  idElement,
  ingredientsCounter,
  ...props
}) => {
  return (
    <>
      <h2 id={idElement} className="text text_type_main-medium">
        {typeName}
      </h2>
      <div className={`${styles.ingredient_container} pt-6 pb-10 pl-4 pr-4`}>
        {ingredientsThisType.map((ingredient) => {
          return (
            <IngredientItem
              ingredient={ingredient}
              key={ingredient._id}
              count={ingredientsCounter[ingredient._id]}
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default IngredientsType;
