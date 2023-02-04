import styles from "./ingredients-type.module.css";
import IngredientItem from "../IngredientItem/IngredientItem";

function IngredientsType({ ingredientsThisType, typeName }) {
  return (
    <>
      <h2 className="text text_type_main-medium">{typeName}</h2>
      <div className={`${styles.ingredient_container} pt-6 pb-10 pl-4 pr-4`}>
      {ingredientsThisType.map((ingredient, index) => {
            return <IngredientItem ingredient={ingredient} key={index} />;
          })}
      </div>
    </>
  );
}

export default IngredientsType;
