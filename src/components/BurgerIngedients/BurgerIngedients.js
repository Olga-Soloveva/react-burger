import styles from "./burger-ingedients.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useState, useCallback, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../IngredientsType/IngredientsType";

function BurgerIngedients({ ingredients }) {
  const [current, setCurrent] = useState("one");
  const [isModalIngredientOpen, setIsModalIngredientOpen] = useState(false);
  const ingredientsByType = useMemo(
    (() => {
    let bun = [];
    let main = [];
    let sauce = [];
    ingredients.forEach((ingredient) => {
      if (ingredient.type === "bun") {
        bun = [...bun, ingredient];
      } else if (ingredient.type === "main") {
        main = [...main, ingredient];
      } else if (ingredient.type === "sauce") {
        sauce = [...sauce, ingredient];
      }
    });
    return { bun, main, sauce };
  }), [ingredients]);

  const [selectedIngredient, setSelectedIngredient] = useState({});

  const closeModal = useCallback(() => {
    setIsModalIngredientOpen(false);
  }, []);

  const showIngredientDetails = useCallback((data) => {
    setIsModalIngredientOpen(true);
    setSelectedIngredient(data);
  }, []);

  return (
    <>
      <section className={`${styles.section_container} pt-10 `}>
        <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
        <div className={`${styles.tab} pb-10`}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={`${styles.ingredients}`}>
          <IngredientsType
            ingredientsThisType={ingredientsByType.bun}
            typeName={"Булки"}
            showIngredientDetails={showIngredientDetails}
          />
          <IngredientsType
            ingredientsThisType={ingredientsByType.sauce}
            typeName={"Соусы"}
            showIngredientDetails={showIngredientDetails}
          />
          <IngredientsType
            ingredientsThisType={ingredientsByType.main}
            typeName={"Начинки"}
            showIngredientDetails={showIngredientDetails}
          />
        </div>
      </section>
      {isModalIngredientOpen && (
        <IngredientDetails
          ingredient={selectedIngredient}
          title="Детали ингредиента"
          onClose={closeModal}
        />
      )}
    </>
  );
}

BurgerIngedients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngedients;
