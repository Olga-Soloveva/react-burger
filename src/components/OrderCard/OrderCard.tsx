import styles from "./order-card.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import { TOrderInfo, TIngredientWithCount } from "../../utils/types";

interface IOrderCard {
  orderInfo: TOrderInfo;
  link: string;
  isStatusVisible?: boolean;
}

const OrderCard: FC<IOrderCard> = ({ orderInfo, link, isStatusVisible = false }) => {
  const { number, name, ingredients, status, createdAt } = orderInfo;
  const location = useLocation();

  const { ingredients: ingredientsStore } = useSelector(
    (store) => store.ingredients
  );

  const ingredientsOrderInfo = useMemo(() => {
    let ingredientsOrderData: TIngredientWithCount[] | [] = [];
    let orderAmountData: number = 0;
    ingredientsStore.forEach((ingredientStore) => {
      const ingredientsFilter = ingredients.filter((ingredient) => {
        return ingredient === ingredientStore._id;
      });
      if (ingredientsFilter.length) {
        let ingredientStoreWithCount: TIngredientWithCount = Object.assign(
          {},
          ingredientStore,
          {
            count: ingredientsFilter.length,
          }
        );

        ingredientsOrderData = [
          ...ingredientsOrderData,
          ingredientStoreWithCount,
        ];

        orderAmountData =
          orderAmountData +
           (ingredientStore.price * ingredientsFilter.length);
      }
    });
    return { ingredients: ingredientsOrderData, orderAmount: orderAmountData };
  }, [ingredients, ingredientsStore]);

  let statusText;
  switch (status) {
    case "done":
      statusText = "Выполнен";
      break;
    case "created":
      statusText = "Создан";
      break;
    case "pending":
      statusText = "Готовится";
      break;
    default:
      statusText = "Статус заказа не известен";
      break;
  }

  return (
    <Link
      to={{
        pathname: `${link}/${number}`,
      }}
      state={{ background: location, orderCard: orderInfo }}
      className={styles.link}
    >
      <div className={`${styles.order_card} mb-4 p-6`}>
        <div className={`${styles.container_columns} mb-6`}>
          <h2 className="text text_type_digits-default">#{number}</h2>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <div className={`${styles.container_name_status} mb-6`}>
          <p className="text text_type_main-medium ">{name}</p>
          {isStatusVisible ? (
            <div className={`${styles.container_status} mt-2 ${status === `done` ? styles.container_status_active : ""}`}>
              <p className="text text_type_main-small">{statusText}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={`${styles.container_columns}`}>
          <div className={styles.container_ingredient}>
            {ingredientsOrderInfo.ingredients.map(
              (ingredient, index, array) => {
                if (index <= 4) {
                  return (
                    <div
                      className={styles.ingredient}
                      style={{
                        backgroundImage: `url(${ingredient.image})`,
                        zIndex: 100 - index,
                      }}
                      key={`${number}${index}`}
                    ></div>
                  );
                } else if (index === 5) {
                  return (
                    <div
                      className={`${styles.ingredient}`}
                      style={{
                        backgroundImage: `url(https://code.s3.yandex.net/react/code/meat-03-mobile.png)`,
                        zIndex: 95,
                      }}
                      key={`${number}${index}`}
                    >
                      <div className={` ${styles.ingredient_over}`}>
                        <p className="text text_type_main-default">{`+${
                          array.length - index
                        }`}</p>
                      </div>
                    </div>
                  );
                } else {
                  return "";
                }
              }
            )}
          </div>
          <div className={`${styles.price} ml-6`}>
            <p className="text text_type_digits-default">
              {ingredientsOrderInfo.orderAmount}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(OrderCard);
