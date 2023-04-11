import styles from "./styles/orders.module.css";
import OrderCard from "../components/OrderCard/OrderCard";
import React, { useState } from "react";
import { TOrderInfo } from "../utils/types";

//WebSocket: Заменить тестовые данные
import { orderTestDataAll } from "../utils/testData";

export function OrdersPage() {
  //WebSocket: Заменить тестовые данные

  const [ordersRequest, setOrdersRequest] = useState<boolean>(false);
  const [ordersFailed, setOrdersFailed] = useState<boolean>(false);

  return (
    <main className={styles.main_container}>
      {!ordersRequest && !ordersFailed ? (
        <div className={styles.content}>
          <section className={`${styles.section_container} pt-10 `}>
            <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
            <div className={styles.orders}>
              {orderTestDataAll.orders.map((order: TOrderInfo) => {
                return <OrderCard orderInfo={order} key={order.number} />;
              })}
            </div>
          </section>
        </div>
      ) : (
        <>
          {ordersFailed && (
            <p className="text text_type_main-default mt-20">
              Ошибка сервера: невозможно загрузить ленту заказов.
            </p>
          )}
          {ordersRequest && (
            <p className="text text_type_main-default mt-20">
              Загрузка ленты заказов...
            </p>
          )}
        </>
      )}
    </main>

    //Отразить инфо в случае ошибки по аналогии с BurgerIngredients
  );
}
