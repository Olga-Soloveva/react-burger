import styles from "./styles/page.module.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import OrderCardInfo from "../components/OrderCardInfo/OrderCardInfo";

//WebSocket: Заменить тестовые данные
import { orderTestData } from "../utils/testData";

export function OrderInfoPage() {
  //WebSocket: Заменить тестовые данные
  const orderInfo = orderTestData.orders[0];

  const [orderInfoRequest, setOrderInfoRequest] = useState<boolean>(false);
  const [orderInfoFailed, setOrderInfoFailed] = useState<boolean>(false);

  const orderFound = orderInfo ? "found" : "notfound";

  let { orderId } = useParams();

  return (
    <div className={`${styles.content}  ${styles.content_page_order_info}`}>
      {!orderInfoFailed && !orderInfoRequest ? (
        <>
          {orderFound === "found" && orderInfo && (
            <OrderCardInfo order={orderInfo} />
          )}
          {orderFound === "notfound" && (
            <>
              <p className="text text_type_main-default mt-10 mb-10">
                Заказ не найден.
              </p>
            </>
          )}
        </>
      ) : (
        //WebSocket: Отразить пользователю загрузку данных и ошибку сервера
        <>
          {orderInfoFailed && (
            <p className="text text_type_main-default pt-4">
              Ошибка сервера: невозможно загрузить заказы.
            </p>
          )}
          {orderInfoRequest && (
            <p className="text text_type_main-default pt-4">
              Загрузка информации о заказе...
            </p>
          )}
        </>
      )}
    </div>
  );
}
