import styles from "./styles/page.module.css";
import orderHistoryStyles from "./styles/order-history.module.css";
import React, { useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "../utils/hooks";
import Menu from "../components/Menu/Menu";
import OrderCard from "../components/OrderCard/OrderCard";
import { TOrderInfo } from "../utils/types";
import { WS_URL_ORDER_HISTORY } from "../utils/сonstant";
import { WebsocketStatus } from "../utils/types";
import { connect } from "../services/actions/orderFeed";
import { getCookie } from "../utils/utilsApi";

export function OrderHistory() {
  const location = useLocation();

  const dispatch = useDispatch();
  const accessToken = getCookie("token");

  const { orders, status: statusWS } = useSelector((store) => store.orderFeed);

  const reversOrders = [...orders].reverse();

  useEffect(() => {
    dispatch(connect(`${WS_URL_ORDER_HISTORY}?token=${accessToken}`));
  }, [dispatch, accessToken]);

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
          {statusWS === WebsocketStatus.ONLINE ? (
            <div className={orderHistoryStyles.column_content}>
              {reversOrders.map((order: TOrderInfo) => {
                return (
                  <OrderCard
                    orderInfo={order}
                    link={location.pathname}
                    isStatusVisible={true}
                    key={order.number}
                  />
                );
              })}
            </div>
          ) : (
            <>
              {statusWS === WebsocketStatus.ERROR && (
                <p className="text text_type_main-default mt-20">
                  Ошибка сервера: невозможно загрузить историю заказов.
                </p>
              )}
              {statusWS === WebsocketStatus.CONNECTING && (
                <p className="text text_type_main-default mt-20">
                  Загрузка истории заказов...
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
