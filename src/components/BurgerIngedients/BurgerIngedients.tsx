import styles from "./burger-ingedients.module.css";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../IngredientsType/IngredientsType";
import { TIngredient, TingredientsCounter } from "../../utils/types";

function BurgerIngedients() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store: any) => store.ingredients
  );
  const { bunComponent, otherComponents } = useSelector(
    (store: any) => store.components
  );

  const [currentTab, setCurrentTab] = useState("one");

  const ingredientsByType = useMemo(() => {
    let bun: TIngredient[] = [];
    let main: TIngredient[] = [];
    let sauce: TIngredient[] = [];
    ingredients.forEach((ingredient: TIngredient) => {
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

  const ingredientsCounter = useMemo(() => {
    const counters: TingredientsCounter = {};
    otherComponents.forEach((component: TIngredient) => {
      if (!counters[component._id]) {
        counters[component._id] = 0;
      }
      counters[component._id]++;
    });
    if (bunComponent) {
      counters[bunComponent._id] = 2;
    }
    return counters;
  }, [bunComponent, otherComponents]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const setActiveTab = () => {
    const tabContainerPosition =
      document.getElementById("tabContainer")?.getBoundingClientRect().top || 0;
    const tabElement = ["buns", "sauces", "mains"];
    const tabElementData = tabElement.map((item) => {
      return {
        type: item,
        position: Math.abs(
          (document.getElementById(item)?.getBoundingClientRect().top || 0) -
            tabContainerPosition
        ),
      };
    });

    const activeTabElement = tabElementData.sort(function (a, b) {
      return a.position - b.position;
    })[0]["type"];

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
              ingredientsCounter={ingredientsCounter}
              idElement="buns"
            />
            <IngredientsType
              ingredientsThisType={ingredientsByType.sauce}
              typeName={"Соусы"}
              ingredientsCounter={ingredientsCounter}
              idElement="sauces"
            />
            <IngredientsType
              ingredientsThisType={ingredientsByType.main}
              typeName={"Начинки"}
              ingredientsCounter={ingredientsCounter}
              idElement="mains"
            />
          </div>
        ) : (
          <>
            {ingredientsFailed && (
              <p className="text text_type_main-default pt-4">
                Ошибка сервера: невозможно загрузить ингредиенты.
              </p>
            )}
            {ingredientsRequest && (
              <p className="text text_type_main-default pt-4">
                Загрузка ингредиентов...
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}

export default React.memo(BurgerIngedients);
