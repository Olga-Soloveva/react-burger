import styles from "./styles/page.module.css";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../utils/hooks";
import OrderCardInfo from "../components/OrderCardInfo/OrderCardInfo";
import { TOrderInfo } from "../utils/types";
import { connect } from "../services/actions/orderFeed";
import { WS_URL_ORDER_FEED } from "../utils/сonstant";
import { WebsocketStatus } from "../utils/types";

export function OrderInfoPage() {
  const dispatch = useDispatch();

  let { orderId } = useParams();

  const [orderFound, setOrderFound] = useState("unknown");

  const { orders, status: statusWS } = useSelector((store) => store.orderFeed);

  useEffect(() => {
    dispatch(connect(WS_URL_ORDER_FEED));
  }, [dispatch]);

  const orderInfo = useMemo(() => {
    if (orders.length) {
      const dataOrder = orders.find(function (item: TOrderInfo) {
        return item.number === Number(orderId);
      });
      if (dataOrder) {
        setOrderFound("found");
        return dataOrder;
      } else {
        setOrderFound("notfound");
        return;
      }
    }
  }, [orderId, orders]);

  return (
    <div className={`${styles.content}  ${styles.content_page_order_info}`}>
      {statusWS === WebsocketStatus.ONLINE ? (
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
        <>
          {statusWS === WebsocketStatus.ERROR && (
            <p className="text text_type_main-default pt-4">
              Ошибка сервера: невозможно загрузить заказы.
            </p>
          )}
          {statusWS === WebsocketStatus.CONNECTING && (
            <p className="text text_type_main-default pt-4">
              Загрузка информации о заказе...
            </p>
          )}
        </>
      )}
    </div>
  );
}
