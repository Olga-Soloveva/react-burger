import styles from "./order-card-info.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import { getIngredients } from "../../services/actions/ingredients";
import { TOrderInfo, TIngredientWithCount } from "../../utils/types";

interface IOrderCardInfo {
  order: TOrderInfo;
  isModal?: boolean;
}

const OrderCardInfo: FC<IOrderCardInfo> = ({ order, isModal }) => {
  const dispatch = useDispatch();
  const { ingredients: ingredientsStore } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    if (!ingredientsStore.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredientsStore]);

  const { number, name, status, ingredients, createdAt } = order;

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
            count:
              ingredientStore.type === "bun"
                ? ingredientsFilter.length * 2
                : ingredientsFilter.length,
          }
        );

        ingredientsOrderData = [
          ...ingredientsOrderData,
          ingredientStoreWithCount,
        ];

        orderAmountData =
          orderAmountData +
          (ingredientStore.type === "bun"
            ? ingredientStore.price * 2 * ingredientsFilter.length 
            : ingredientStore.price * ingredientsFilter.length);
      }
    });
    return { ingredients: ingredientsOrderData, orderAmount: orderAmountData };
  }, [ingredients, ingredientsStore]);

  return (
    <div className={`${styles.card_info} mb-10`}>
      <div
        className={`${styles.container_title} mb-5 ${
          !isModal ? `${styles.container_title_center}` : ""
        }`}
      >
        <h2 className="text text_type_digits-default">#{number}</h2>
      </div>

      <h3 className="text text_type_main-medium">{name}</h3>
      <div className={`${styles.container_status} mt-2`}>
        <p className="text text_type_main-small">{statusText}</p>
      </div>
      <p className="text text_type_main-medium mt-15 mb-6">Соcтав:</p>
      <div className={`${styles.container_ingredients} mb-10`}>
        {ingredientsOrderInfo.ingredients.map((ingredient) => {
          return (
            <div className={`${styles.ingredient_item} mb-4`} key={ingredient._id}>
              <div className={`${styles.ingredient_info}`}>
                <div
                  className={styles.ingredient_image}
                  style={{
                    backgroundImage: `url(${ingredient.image})`,
                  }}
                ></div>
                <div className={`${styles.ingredient_name} ml-4`}>
                  <p className="text text_type_main-default">
                  {ingredient.name}
                  </p>
                </div>
              </div>
              <div className={`${styles.price}`}>
                <p className="text text_type_digits-default">{ingredient.count} x {ingredient.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${styles.container_time_price}`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </p>
        <div className={`${styles.price}`}>
          <p className="text text_type_digits-default">{ingredientsOrderInfo.orderAmount}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderCardInfo);
