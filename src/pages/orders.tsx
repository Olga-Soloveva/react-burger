import styles from "./styles/orders.module.css";
import OrderCard from "../components/OrderCard/OrderCard";
import React, { useState, useMemo } from "react";
import { TOrderInfo } from "../utils/types";

//WebSocket: Заменить тестовые данные
import { orderTestDataAll } from "../utils/testData";

export function OrdersPage() {
  //WebSocket: Заменить тестовые данные

  const [ordersRequest, setOrdersRequest] = useState<boolean>(false);
  const [ordersFailed, setOrdersFailed] = useState<boolean>(false);

  const ordersBoardInfo = useMemo(() => {
    let ordersStatusDone: TOrderInfo[] | [] = [];
    let ordersStatusPending: TOrderInfo[] | [] = [];
    const ordersData: TOrderInfo[] = orderTestDataAll.orders;

    ordersData.forEach((order) => {
      if (order.status === "done" && ordersStatusDone.length <= 9) {
        ordersStatusDone = [...ordersStatusDone, order];
      }

      if (order.status === "pending" && ordersStatusPending.length <= 9) {
        ordersStatusPending = [...ordersStatusPending, order];
      }
    });

    return { done: ordersStatusDone, pending: ordersStatusPending };
  }, []);

  return (
    <main className={styles.main_container}>
      {!ordersRequest && !ordersFailed ? (
        <div className={styles.content}>
          <section className={`${styles.section_orders} pt-10 `}>
            <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
            <div className={styles.orders}>
              {orderTestDataAll.orders.map((order: TOrderInfo) => {
                return <OrderCard orderInfo={order} key={order.number} />;
              })}
            </div>
          </section>
          <section className={`${styles.section_info}`}>
            <div className={`${styles.orders_board}`}>
              <div>
                <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                <div
                  className={`${styles.orders_number} ${styles.orders_number_done}`}
                >
                  {ordersBoardInfo.done.map((order) => {
                    return (
                      <p className="text text_type_digits-default" key={order.number}>
                        {order.number}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2 className="text text_type_main-medium mb-6" >В работе:</h2>
                <div
                  className={`${styles.orders_number}`}
                >
                  {ordersBoardInfo.pending.map((order) => {
                    return (
                      <p className="text text_type_digits-default" key={order.number}>
                        {order.number}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text text_type_main-medium">
                Выполнено за все время:
              </h2>
              <p className="text text_type_digits-large">
                {orderTestDataAll.total}
              </p>
            </div>
            <div>
              <h2 className="text text_type_main-medium">
                Выполнено за сегодня:
              </h2>
              <p className="text text_type_digits-large">
                {orderTestDataAll.totalToday}
              </p>
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
