import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import { useState, useCallback, useMemo } from "react";
import ingredientType from "../../utils/types";
import { testDataOrder } from "../../utils/testData";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ components }) {
  const bunComponent = useMemo(
    () =>
      components.find(function (component) {
        return component.type === "bun";
      }),
    [components]
  );

  const otherComponent = useMemo(
    () =>
      components.filter((component) => {
        return component.type === "main" || component.type === "sauce";
      }),
    [components]
  );
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
          {bunComponent && (
            <div className={`${styles.components_container} pl-4 pr-4`}>
              <BurgerComponent component={bunComponent} type="top" />
            </div>
          )}
          {otherComponent && (
            <div className={` ${styles.components_container_scrol} pl-4 pr-2`}>
              {otherComponent.map((component) => {
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
            <p className="text text_type_digits-medium">610</p>
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

BurgerConstructor.propTypes = {
  components: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;
