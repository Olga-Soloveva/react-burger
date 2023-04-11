import styles from "./styles/page.module.css";
import orderHistoryStyles from "./styles/order-history.module.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../utils/hooks";
import Menu from "../components/Menu/Menu";
import OrderCard from "../components/OrderCard/OrderCard";
import { TOrderInfo } from "../utils/types";

//WebSocket: Заменить тестовые данные
import { orderTestDataAll } from "../utils/testData";


export function OrderHistory() {

  return (
    <>
      <div className={`${styles.content} ${styles.content_page_profile}`}>
        <div className={orderHistoryStyles.content}>
          <div className={orderHistoryStyles.column_menu}>
            <Menu />
            <p
              className={`${orderHistoryStyles.paragraph} text text_type_main-default mt-20`}
            >
              В этом разделе вы можете просмотреть свою историю заказов
            </p>
          </div>
          <div className={orderHistoryStyles.column_content}>
          {orderTestDataAll.orders.map((order: TOrderInfo) => {
                return <OrderCard orderInfo={order} isStatusVisible={true} key={order.number} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
