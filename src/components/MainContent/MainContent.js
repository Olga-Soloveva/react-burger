import styles from "./main-content.module.css";
import { useState, useMemo, useEffect, useReducer } from "react";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngedients from "../BurgerIngedients/BurgerIngedients";
import { BurgerComponentContext } from "../../contexts/BurgerComponentContext";
import { useSelector } from "react-redux";

function MainContent() {
  const { components } = useSelector((store) => store.burger);

  const orderAmountInitialState = { orderAmount: 0 };
  const [orderAmountState, orderAmountDispatcher] = useReducer(
    reducer,
    orderAmountInitialState,
    undefined
  );

  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    orderAmountDispatcher({
      type: "reset",
    });
    components.forEach((component) => {
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
  }, [components]);

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
      orderAmount: orderAmountState.orderAmount,
      orderNumber,
      setOrderNumber,
    };
  }, [orderAmountState, orderNumber, setOrderNumber]);

  return (
    <main className={styles.main_container}>
      <div className={styles.content}>
        <BurgerIngedients />
        <BurgerComponentContext.Provider value={contextValue}>
          <BurgerConstructor />
        </BurgerComponentContext.Provider>
      </div>
    </main>
  );
}

export default MainContent;
