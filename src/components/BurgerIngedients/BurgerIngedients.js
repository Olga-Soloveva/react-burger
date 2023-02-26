import styles from "./burger-ingedients.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import React from "react";
import { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../IngredientsType/IngredientsType";
import { selectedIngredientSlice } from "../../services/reducers/burger";

function BurgerIngedients() {
  const dispatch = useDispatch();
  const { removeIngredientDetails, addIngredientDetails } =
    selectedIngredientSlice.actions;
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.burger.ingredients
  );
  const [currentTab, setCurrentTab] = useState("one");
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
    dispatch(removeIngredientDetails());
  }, [dispatch, removeIngredientDetails]);

  const showIngredientDetails = useCallback(
    (data) => {
      setIsModalIngredientOpen(true);
      dispatch(addIngredientDetails(data));
    },
    [dispatch, addIngredientDetails]
  );

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const setActiveTab = () => {
    const tabContainerPosition = document
      .getElementById("tabContainer")
      .getBoundingClientRect().top;
    const tabElement = ["buns", "sauces", "mains"];
    const tabElementData = tabElement.map((item) => {
      return {
        type: item,
        position: Math.abs(
          document.getElementById(item).getBoundingClientRect().top -
            tabContainerPosition
        ),
      };
    });

    const activeTabElement = tabElementData.sort(function (a, b) {
      return a.position - b.position;
    })[0]['type'];

    setCurrentTab(activeTabElement);
  };

  return (
    <>
      <section className={`${styles.section_container} pt-10 `}>
        <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
        <div className={`${styles.tab} pb-10`} id="tabContainer">
          <Tab value="buns" active={currentTab === "buns"} onClick={onTabClick}>
            Булки
          </Tab>
          <Tab
            value="sauces"
            active={currentTab === "sauces"}
            onClick={onTabClick}
          >
            Соусы
          </Tab>
          <Tab
            value="mains"
            active={currentTab === "mains"}
            onClick={onTabClick}
          >
            Начинки
          </Tab>
        </div>
        {!ingredientsFailed && !ingredientsRequest ? (
          <div className={`${styles.ingredients}`} onScroll={setActiveTab}>
            <IngredientsType
              ingredientsThisType={ingredientsByType.bun}
              typeName={"Булки"}
              showIngredientDetails={showIngredientDetails}
              idElement="buns"
            />
            <IngredientsType
              ingredientsThisType={ingredientsByType.sauce}
              typeName={"Соусы"}
              showIngredientDetails={showIngredientDetails}
              idElement="sauces"
            />
            <IngredientsType
              ingredientsThisType={ingredientsByType.main}
              typeName={"Начинки"}
              showIngredientDetails={showIngredientDetails}
              idElement="mains"
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
