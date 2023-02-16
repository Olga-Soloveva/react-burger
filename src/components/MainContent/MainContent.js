import styles from "./main-content.module.css";
import { useState, useMemo, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngedients from "../BurgerIngedients/BurgerIngedients";
import { BurgerComponentContext } from "../../contexts/BurgerComponentContext";

function MainContent({ ingredients }) {
  const orderAmountInitialState = { orderAmount: 0 };
  const [orderAmountState, orderAmountDispatcher] = useReducer(
    reducer,
    orderAmountInitialState,
    undefined
  );

  const bunComponentData = useMemo(
    () =>
      ingredients.find(function (component) {
        return component.type === "bun";
      }),
    [ingredients]
  );

  const otherComponentsData = useMemo(
    () =>
      ingredients.filter((component) => {
        return component.type === "main" || component.type === "sauce";
      }),
    [ingredients]
  );

  const [bunComponent, setBunComponent] = useState([]);
  const [otherComponents, setOtherComponents] = useState([]);
  const [orderIngredients, setOrderIngredients] = useState([]);
  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    otherComponentsData && setOtherComponents(otherComponentsData);
  }, [otherComponentsData]);

  useEffect(() => {
    bunComponentData && setBunComponent(bunComponentData);
  }, [bunComponentData]);

  useEffect(() => {
    setOrderIngredients([bunComponent, ...otherComponents]);
  }, [bunComponent, otherComponents]);

  useEffect(() => {
    orderAmountDispatcher({
      type: "reset",
    });
    orderIngredients.forEach((component) => {
      if (component.type === "bun") {
        orderAmountDispatcher({
          type: "addBunComponent",
          payload: component.price,
        });
      } else if (component.type === "main" || component.type === "sauce") {
        orderAmountDispatcher({
          type: "addOtherComponent",
          payload: component.price,
        });
      }
    });
  }, [orderIngredients]);

  function reducer(state, action) {
    switch (action.type) {
      case "addBunComponent":
        return { orderAmount: state.orderAmount + action.payload * 2 };
      case "addOtherComponent":
        return { orderAmount: state.orderAmount + action.payload };
      case "delete":
        return { orderAmount: state.orderAmount - action.payload };
      case "reset":
        return orderAmountInitialState;

      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  return (
    <main className={styles.main_container}>
      <div className={styles.content}>
        <BurgerIngedients ingredients={ingredients} />
        <BurgerComponentContext.Provider
          value={{ bunComponent, otherComponents, orderIngredients, orderAmount: orderAmountState.orderAmount, orderNumber, setOrderNumber }}
        >
          <BurgerConstructor/>
        </BurgerComponentContext.Provider>
      </div>
    </main>
  );
}

MainContent.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};

export default MainContent;
