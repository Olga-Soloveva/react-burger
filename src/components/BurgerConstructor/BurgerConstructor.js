import styles from "./burger-constructor.module.css";
import React, { useState, useCallback, useContext, useMemo } from "react";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerComponentContext } from "../../contexts/BurgerComponentContext";
import { createOrder } from "../../utils/ingredients-api";

function BurgerConstructor() {
  const { bunComponent, otherComponents, orderIngredients, orderAmount, setOrderNumber } =
    useContext(BurgerComponentContext);

  const ingredients = useMemo(
    () =>
    orderIngredients.map((ingredient) => {
        return ingredient._id;
      }),
    [orderIngredients]
  );
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOrderOpen(false);
  }, []);

  const placeOrder = (data) => {
    setIsModalOrderOpen(true);
    createOrder(ingredients)
      .then((res) => {
        setOrderNumber(res.order.number);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className={`${styles.section_container} pt-25 `}>
        <div className={`${styles.burger_components}`}>
          {bunComponent.length !== 0 && (
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
          {bunComponent.length !== 0 && (
            <div className={`${styles.components_container} pl-4 pr-4`}>
              <BurgerComponent component={bunComponent} type="bottom" />
            </div>
          )}
        </div>
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
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {isModalOrderOpen && (
        <Modal itle={null} onClose={closeModal}>
          <OrderDetails/>
        </Modal>
      )}
    </>
  );
}


export default React.memo(BurgerConstructor);
