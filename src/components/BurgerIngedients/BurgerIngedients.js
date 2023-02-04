import styles from "./burger-ingedients.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../IngredientsType/IngredientsType";

function BurgerIngedients({ ingredients }) {
  const [current, setCurrent] = useState("one");
  const ingredientsByType = (function () {
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
  })();

  return (
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
        />
        <IngredientsType
          ingredientsThisType={ingredientsByType.sauce}
          typeName={"Соусы"}
        />
        <IngredientsType
          ingredientsThisType={ingredientsByType.main}
          typeName={"Начинки"}
        />
      </div>
    </section>
  );
}

BurgerIngedients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
    })
  ),
};

export default BurgerIngedients;
