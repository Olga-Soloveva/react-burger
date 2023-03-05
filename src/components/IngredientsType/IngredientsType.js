import styles from "./ingredients-type.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import IngredientItem from "../IngredientItem/IngredientItem";

function IngredientsType({ ingredientsThisType, typeName, idElement, ingredientsCounter, ...props }) {
  return (
    <>
      <h2 id={idElement} className="text text_type_main-medium">{typeName}</h2>
      <div className={`${styles.ingredient_container} pt-6 pb-10 pl-4 pr-4`}>
      {ingredientsThisType.map((ingredient) => {
            return <IngredientItem ingredient={ingredient} key={ingredient._id} count={ingredientsCounter[ingredient._id]} {...props}/>;
          })}
      </div>
    </>
  );
}

IngredientsType.propTypes = {
  ingredientsThisType: PropTypes.arrayOf(ingredientType).isRequired,
  typeName: PropTypes.string.isRequired,
  idElement: PropTypes.string.isRequired,
  ingredientsCounter: PropTypes.object.isRequired,
};


export default IngredientsType;
