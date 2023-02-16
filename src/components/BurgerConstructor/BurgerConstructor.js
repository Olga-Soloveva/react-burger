import styles from "./burger-constructor.module.css";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import React, { useState, useCallback, useContext } from "react";
import { testDataOrder } from "../../utils/testData";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerComponentContext } from "../../contexts/BurgerComponentContext";

function BurgerConstructor({ orderAmount }) {
  const { bunComponent, otherComponent } = useContext(BurgerComponentContext);

  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOrderOpen(false);
  }, []);

  const showOrderDetails = useCallback((data) => {
    setIsModalOrderOpen(true);
  }, []);

  return (
    <>
      <section className={`${styles.section_container} pt-25 `}>
        <div className={`${styles.burger_components}`}>
          {bunComponent.length !== 0 && (
            <div className={`${styles.components_container} pl-4 pr-4`}>
              <BurgerComponent component={bunComponent} type="top" />
            </div>
          )}
          {otherComponent.length !== 0 && (
            <div className={` ${styles.components_container_scrol} pl-4 pr-2`}>
              {otherComponent.map((component) => {
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
            onClick={showOrderDetails}
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {isModalOrderOpen && (
        <Modal itle={null} onClose={closeModal}>
          <OrderDetails order={testDataOrder} />
        </Modal>
      )}
    </>
  );
}

export default React.memo(BurgerConstructor);
