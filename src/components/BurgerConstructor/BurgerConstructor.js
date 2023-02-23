import styles from "./burger-constructor.module.css";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { orderSlice } from "../../services/reducers/burger";
import { componentsSlice } from "../../services/reducers/burger";
import { createOrder } from "../../services/actions/burger";

function BurgerConstructor() {
  const { components } = useSelector((store) => store.burger);
  const { ingredients } = useSelector((store) => store.burger.ingredients);
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const { getInitialComponents } = componentsSlice.actions;
  const { clearOrder } = orderSlice.actions;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialComponents(ingredients));
  }, [dispatch, getInitialComponents, ingredients]);

  const bunComponent = useMemo(
    () =>
      components.find((component) => {
        return component.type === "bun";
      }),
    [components]
  );

  const otherComponents = useMemo(
    () =>
      components.filter((component) => {
        return component.type === "main" || component.type === "sauce";
      }),
    [components]
  );

  const orderAmountInitialState = { orderAmount: 0 };
  const [orderAmountState, orderAmountDispatcher] = useReducer(
    reducer,
    orderAmountInitialState,
    undefined
  );

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

  const closeModal = useCallback(() => {
    setIsModalOrderOpen(false);
    dispatch(clearOrder());
  }, [dispatch, clearOrder]);

  const placeOrder = (data) => {
    setIsModalOrderOpen(true);
    dispatch(createOrder(components));
  };

  return (
    <>
      <section className={`${styles.section_container} pt-25 `}>
        <div className={`${styles.burger_components}`}>
          {bunComponent && (
            <div className={`${styles.components_container} pl-4 pr-4`}>
              <BurgerComponent component={bunComponent} type="top" />
            </div>
          )}
          {otherComponents.length !== 0 && (
            <div className={` ${styles.components_container_scrol} pl-4 pr-2`}>
              {otherComponents.map((component) => {
                return (
                  <BurgerComponent component={component} key={component._id} />
                );
              })}
            </div>
          )}
          {bunComponent && (
            <div className={`${styles.components_container} pl-4 pr-4`}>
              <BurgerComponent component={bunComponent} type="bottom" />
            </div>
          )}
        </div>
        <div className={`${styles.info} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <p className="text text_type_digits-medium">
              {orderAmountState.orderAmount}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={placeOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {isModalOrderOpen && (
        <Modal itle={null} onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default React.memo(BurgerConstructor);
