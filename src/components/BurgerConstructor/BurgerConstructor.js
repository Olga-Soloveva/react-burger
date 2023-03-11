import styles from "./burger-constructor.module.css";
import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { orderSlice } from "../../services/reducers/order";
import { createOrder } from "../../services/actions/order";
import { componentsSlice } from "../../services/reducers/components";
import { useProvideAuth } from "../../utils/auth";
import { getUser } from "../../services/actions/users";

function BurgerConstructor() {
  const { bunComponent, otherComponents } = useSelector(
    (store) => store.components
  );
  const navigate = useNavigate();
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const { getComponent, clearConstructor } = componentsSlice.actions;
  const { clearOrder } = orderSlice.actions;
  const { refreshToken } = useProvideAuth();
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

  const placeOrder = async (data) => {
    await dispatch(getUser())
      .unwrap()
      .then(() => {
        setIsModalOrderOpen(true);
        dispatch(createOrder([...otherComponents, bunComponent]))
          .unwrap()
          .then(() => {
            dispatch(clearConstructor());
          });
      })
      .catch((err) => {
        refreshToken()
          .then(() => {
            setIsModalOrderOpen(true);
            dispatch(createOrder())
              .unwrap()
              .then((res) => {
                dispatch(clearConstructor());
              });
          })
          .catch((err) => {
            navigate("/login");
          });
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
              Перетащите в это поле ингридиенты из меню слева.
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
              Чтобы офорить заказ, добавьте булку к заказу.
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
            {...(!bunComponent && { disabled: true })}
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {isModalOrderOpen && (
        <Modal title={null} onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default React.memo(BurgerConstructor);
