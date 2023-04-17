import styles from "./styles/orders.module.css";
import OrderCard from "../components/OrderCard/OrderCard";
import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "../utils/hooks";
import { TOrderInfo } from "../utils/types";
import { useDispatch } from "../utils/hooks";
import { connect } from "../services/actions/orderFeed";
import { WS_URL_ORDER_FEED } from "../utils/сonstant";
import { WebsocketStatus } from "../utils/types";

export function OrdersPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    orders,
    orderTotal,
    orderTotalToday,
    status: statusWS,
  } = useSelector((store) => store.orderFeed);

  const ordersBoardInfo = useMemo(() => {
    let ordersStatusDone: TOrderInfo[] | [] = [];
    let ordersStatusPending: TOrderInfo[] | [] = [];
    const ordersData: TOrderInfo[] = orders;

    ordersData.forEach((order) => {
      if (order.status === "done" && ordersStatusDone.length <= 9) {
        ordersStatusDone = [...ordersStatusDone, order];
      }

      if (order.status === "pending" && ordersStatusPending.length <= 9) {
        ordersStatusPending = [...ordersStatusPending, order];
      }
    });

    return { done: ordersStatusDone, pending: ordersStatusPending };
  }, [orders]);

  useEffect(() => {
    dispatch(connect(WS_URL_ORDER_FEED));
  }, [dispatch]);

  return (
    <main className={styles.main_container}>
      {statusWS === WebsocketStatus.ONLINE ? (
        <div className={styles.content}>
          <section className={`${styles.section_orders} pt-10 `}>
            <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
            <div className={styles.orders}>
              {orders.map((order: TOrderInfo) => {
                return <OrderCard orderInfo={order} link={location.pathname} key={order.number} />;
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
                      <p
                        className="text text_type_digits-default"
                        key={order.number}
                      >
                        {order.number}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                <div className={`${styles.orders_number}`}>
                  {ordersBoardInfo.pending.map((order) => {
                    return (
                      <p
                        className="text text_type_digits-default"
                        key={order.number}
                      >
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
              <p className="text text_type_digits-large">{orderTotal}</p>
            </div>
            <div>
              <h2 className="text text_type_main-medium">
                Выполнено за сегодня:
              </h2>
              <p className="text text_type_digits-large">{orderTotalToday}</p>
            </div>
          </section>
        </div>
      ) : (
        <>
          {statusWS === WebsocketStatus.ERROR && (
            <p className="text text_type_main-default mt-20">
              Ошибка сервера: невозможно загрузить ленту заказов.
            </p>
          )}
          {statusWS === WebsocketStatus.CONNECTING && (
            <p className="text text_type_main-default mt-20">
              Загрузка ленты заказов...
            </p>
          )}
        </>
      )}
    </main>
  );
}
