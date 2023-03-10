import styles from "./burger-constructor.module.css";
import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { orderSlice } from "../../services/reducers/order";
import { componentsSlice } from "../../services/reducers/components";
import { createOrder } from "../../services/actions/order";

function BurgerConstructor() {
  const { bunComponent, otherComponents } = useSelector(
    (store) => store.components
  );
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const { getComponent, clearConstructor } = componentsSlice.actions;
  const { clearOrder } = orderSlice.actions;

  const dispatch = useDispatch();

  const [{ isHover }, dropIngredient] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch(getComponent(ingredient));
    },
  });

  const orderAmount = useMemo(() => {
    return (
      (bunComponent ? bunComponent.price * 2 : 0) +
      otherComponents.reduce(function (previousValue, item) {
        return previousValue + item.price;
      }, 0)
    );
  }, [bunComponent, otherComponents]);

  const closeModal = useCallback(() => {
    setIsModalOrderOpen(false);
    dispatch(clearOrder());
  }, [dispatch, clearOrder]);

  const placeOrder = (data) => {
    setIsModalOrderOpen(true);
    dispatch(createOrder([...otherComponents, bunComponent]))
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };

  return (
    <>
      <section
        className={`${styles.section_container} pt-25 `}
        ref={dropIngredient}
      >
        {!bunComponent && otherComponents.length === 0 && (
          <div className={styles.instruction}>
            <p className="text text_type_main-default pt-4">
              ???????????????????? ?? ?????? ???????? ?????????????????????? ???? ???????? ??????????.
            </p>
          </div>
        )}
        {(bunComponent || otherComponents.length > 0) && (
          <div
            className={`${styles.burger_components} ${
              isHover ? styles.hover : ""
            } `}
          >
            {bunComponent && (
              <div className={`${styles.components_container} pl-4 pr-4`}>
                <BurgerComponent component={bunComponent} type="top" />
              </div>
            )}
            {otherComponents.length !== 0 && (
              <div
                className={` ${styles.components_container_scrol} pl-4 pr-2`}
              >
                {otherComponents.map((component) => {
                  return (
                    <BurgerComponent
                      component={component}
                      key={component.componentId}
                    />
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
        )}
        {!bunComponent && otherComponents.length > 0 && (
          <div className={styles.notification}>
            <p className="text text_type_main-default pt-4">
              ?????????? ?????????????? ??????????, ???????????????? ?????????? ?? ????????????.
            </p>
          </div>
        )}
        <div className={`${styles.info} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <p className="text text_type_digits-medium">{orderAmount}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={placeOrder}
            {...(!bunComponent) && { disabled: true }}
          >
            ???????????????? ??????????
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
