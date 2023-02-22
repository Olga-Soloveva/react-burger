import styles from "./burger-constructor.module.css";
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerComponentContext } from "../../contexts/BurgerComponentContext";
import { createOrder } from "../../utils/ingredients-api";
import { getInitialComponents } from "../../services/actions/burger";

function BurgerConstructor() {
  const { components } = useSelector((store) => store.burger);
  const { ingredients } = useSelector((store) => store.burger.ingredients);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInitialComponents(ingredients));
  }, [dispatch, ingredients]);

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

  const {
    orderAmount,
    setOrderNumber,
  } = useContext(BurgerComponentContext);

  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOrderOpen(false);
  }, []);

  const placeOrder = (data) => {
    setOrderNumber(0);
    setIsLoading(true);
    setIsModalOrderOpen(true);
    createOrder(components)
      .then((res) => {
        setHasError(false);
        setOrderNumber(res.order.number);
      })
      .catch((err) => {
        setOrderNumber(0);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <OrderDetails hasError={hasError} isLoading={isLoading} />
        </Modal>
      )}
    </>
  );
}

export default React.memo(BurgerConstructor);
