import styles from "./order-card.module.css";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import { useLocation, Link } from "react-router-dom";
import { ROUTE_FEED } from "../../utils/сonstant";

const OrderCard: FC = () => {
  const location = useLocation();

//Заменить orderId
  const orderId = 888
  const data = 'Здесь будут данные'

  return (
    <Link
    to={{
      pathname: `${ROUTE_FEED}/${orderId}`,
    }}
    state={{ background: location, orderCard: data }}
    className={styles.link}
  >
      <div className={`${styles.order_card} mb-4 p-6`}>
        <div className={`${styles.container_columns} mb-6`}>
          <h2 className="text text_type_digits-default">#034535</h2>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date("2023-04-09T20:13:23.654Z")} />
          </p>
        </div>
        <p className="text text_type_main-medium mb-6">
          Black Hole Singularity острый бургер
        </p>
        <div className={`${styles.container_columns}`}>
          <div className={styles.container_ingredient}>
            <div
              className={styles.ingredient}
              style={{
                backgroundImage: `url(https://code.s3.yandex.net/react/code/bun-01.png)`,
                zIndex: 100,
              }}
            ></div>
            <div
              className={styles.ingredient}
              style={{
                backgroundImage: `url(https://code.s3.yandex.net/react/code/sauce-03.png)`,
                zIndex: 99,
              }}
            ></div>
            <div
              className={styles.ingredient}
              style={{
                backgroundImage: `url(https://code.s3.yandex.net/react/code/meat-01.png)`,
                zIndex: 98,
              }}
            ></div>
            <div
              className={styles.ingredient}
              style={{
                backgroundImage: `url(https://code.s3.yandex.net/react/code/core.png)`,
                zIndex: 97,
              }}
            ></div>
            <div
              className={styles.ingredient}
              style={{
                backgroundImage: `url(https://code.s3.yandex.net/react/code/meat-03-mobile.png)`,
                zIndex: 96,
              }}
            ></div>
            <div
              className= {`${styles.ingredient}`}
              style={{
                backgroundImage: `url(https://code.s3.yandex.net/react/code/meat-03-mobile.png)`,
                zIndex: 95,
              }}
            >
               <div
              className= {` ${styles.ingredient_over}`}

            ><p className="text text_type_main-default">+4</p></div>
              
            </div>
          </div>
          <div className={`${styles.price} ml-6`}>
            <p className="text text_type_digits-default">500</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
      </Link>
  );
};

export default React.memo(OrderCard);
