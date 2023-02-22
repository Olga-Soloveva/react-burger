import styles from "./burger-ingedients.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import React from "react";
import { useState, useCallback, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../IngredientsType/IngredientsType";
import { addIngredientDetails, removeIngredientDetails } from "../../services/actions/burger";

function BurgerIngedients() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed} = useSelector(state => state.burger.ingredients);
  const [current, setCurrent] = useState("one");
  const [isModalIngredientOpen, setIsModalIngredientOpen] = useState(false);
  const ingredientsByType = useMemo(() => {
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
  }, [ingredients]);

  const closeModal = useCallback(() => {
    setIsModalIngredientOpen(false);
    dispatch(removeIngredientDetails())
  }, [dispatch]);

  const showIngredientDetails = useCallback((data) => {
    setIsModalIngredientOpen(true);
    dispatch(addIngredientDetails(data))
  }, [dispatch]);

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
        {!ingredientsFailed && !ingredientsRequest? (
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
        ) : (
          <>
            {ingredientsFailed && (
              <p className="text text_type_main-default pt-4">
                Ошибка сервера: невозможно загрузить ингридиенты.
              </p>
            )}
            {ingredientsRequest && (
              <p className="text text_type_main-default pt-4">
                Загрузка ингридиентов...
              </p>
            )}
          </>
        )}
      </section>
      {isModalIngredientOpen && (
        <Modal title={"Детали ингредиента"} onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default React.memo(BurgerIngedients);
