import styles from "./main-content.module.css";
import { useState, useMemo, useEffect, useReducer, useContext } from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngedients from "../BurgerIngedients/BurgerIngedients";
import { BurgerIngredientContext } from "../../contexts/BurgerIngredientContext";
import { BurgerComponentContext } from "../../contexts/BurgerComponentContext";

function MainContent() {
  const { ingredients } = useContext(BurgerIngredientContext);

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

  const contextValue = useMemo(() => {
    return {
      bunComponent,
      otherComponents,
      orderIngredients,
      orderAmount: orderAmountState.orderAmount,
      orderNumber,
      setOrderNumber,
    };
  }, [
    bunComponent,
    otherComponents,
    orderIngredients,
    orderAmountState,
    orderNumber,
    setOrderNumber,
  ]);

  return (
    <main className={styles.main_container}>
      <div className={styles.content}>
        <BurgerIngedients ingredients={ingredients} />
        <BurgerComponentContext.Provider value={contextValue}>
          <BurgerConstructor />
        </BurgerComponentContext.Provider>
      </div>
    </main>
  );
}

export default MainContent;
