import styles from "./order-card.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "../../utils/hooks";
import { getIngredients } from "../../services/actions/ingredients";
import { ROUTE_FEED } from "../../utils/сonstant";
import { TOrderInfo, TIngredient } from "../../utils/types";

interface IOrderCard {
  orderInfo: TOrderInfo;
}

const OrderCard: FC<IOrderCard> = ({ orderInfo }) => {
  const { number, name, ingredients, updatedAt } = orderInfo;
  const location = useLocation();

  const dispatch = useDispatch();
  const { ingredients: ingredientsStore } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    if (!ingredientsStore.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredientsStore]);

  const ingredientsOrderInfo = useMemo(() => {
    let ingredientsOrderData: TIngredient[] | [] = [];
    let orderAmountData: number = 0;
    ingredients.forEach((ingredient) => {
      const ingredientFind = ingredientsStore.find((ingredientStore) => {
        return ingredient === ingredientStore._id;
      });
      if (ingredientFind) {
        ingredientsOrderData = [...ingredientsOrderData, ingredientFind];

        orderAmountData =
          orderAmountData +
          (ingredientFind.type === "bun"
            ? ingredientFind.price * 2
            : ingredientFind.price);
      }
    });
    return { ingredients: ingredientsOrderData, orderAmount: orderAmountData };
  }, [ingredients, ingredientsStore]);

  return (
    <Link
      to={{
        pathname: `${ROUTE_FEED}/${number}`,
      }}
      state={{ background: location, orderCard: orderInfo }}
      className={styles.link}
    >
      <div className={`${styles.order_card} mb-4 p-6`}>
        <div className={`${styles.container_columns} mb-6`}>
          <h2 className="text text_type_digits-default">#{number}</h2>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(updatedAt)} />
          </p>
        </div>
        <p className="text text_type_main-medium mb-6">{name}</p>
        <div className={`${styles.container_columns}`}>
          <div className={styles.container_ingredient}>
            {ingredientsOrderInfo.ingredients.map(
              (ingredient, index, array) => {
                // console.log(`${number}${index}`)
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
                  return ('')
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
