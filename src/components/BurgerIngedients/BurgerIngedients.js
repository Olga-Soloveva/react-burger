import styles from "./burger-ingedients.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import React from "react";
import { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsType from "../IngredientsType/IngredientsType";
import { selectedIngredientSlice } from "../../services/reducers/selectedIngredient";

function BurgerIngedients() {
  const dispatch = useDispatch();
  const { removeIngredientDetails, addIngredientDetails } =
    selectedIngredientSlice.actions;
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );
  const { bunComponent, otherComponents } = useSelector(
    (store) => store.components
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

  const ingredientsCounter = useMemo(() => {
    const counters = {};
    otherComponents.forEach((component) => {
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
    })[0]["type"];

    setCurrentTab(activeTabElement);
  };

  return (
    <>
      <section className={`${styles.section_container} pt-10 `}>
        <h1 className="text text_type_main-large pb-5">???????????????? ????????????</h1>
        <div className={`${styles.tab} pb-10`} id="tabContainer">
          <Tab value="buns" active={currentTab === "buns"} onClick={onTabClick}>
            ??????????
          </Tab>
          <Tab
            value="sauces"
            active={currentTab === "sauces"}
            onClick={onTabClick}
          >
            ??????????
          </Tab>
          <Tab
            value="mains"
            active={currentTab === "mains"}
            onClick={onTabClick}
          >
            ??????????????
          </Tab>
        </div>
        {!ingredientsFailed && !ingredientsRequest ? (
          <div className={`${styles.ingredients}`} onScroll={setActiveTab}>
            <IngredientsType
              ingredientsThisType={ingredientsByType.bun}
              typeName={"??????????"}
              showIngredientDetails={showIngredientDetails}
              ingredientsCounter={ingredientsCounter}
              idElement="buns"
            />
            <IngredientsType
              ingredientsThisType={ingredientsByType.sauce}
              typeName={"??????????"}
              showIngredientDetails={showIngredientDetails}
              ingredientsCounter={ingredientsCounter}
              idElement="sauces"
            />
            <IngredientsType
              ingredientsThisType={ingredientsByType.main}
              typeName={"??????????????"}
              showIngredientDetails={showIngredientDetails}
              ingredientsCounter={ingredientsCounter}
              idElement="mains"
            />
          </div>
        ) : (
          <>
            {ingredientsFailed && (
              <p className="text text_type_main-default pt-4">
                ???????????? ??????????????: ???????????????????? ?????????????????? ??????????????????????.
              </p>
            )}
            {ingredientsRequest && (
              <p className="text text_type_main-default pt-4">
                ???????????????? ????????????????????????...
              </p>
            )}
          </>
        )}
      </section>
      {isModalIngredientOpen && (
        <Modal title={"???????????? ??????????????????????"} onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default React.memo(BurgerIngedients);
