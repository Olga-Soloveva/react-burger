import styles from "./order-details.module.css";
import WrapperIcon from "../WtapperIcon/WrapperIcon";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { orderNumber, orderRequest, orderFailed } = useSelector(
    (store) => store.order
  );

  return (
    <>
      <h3 className={`text text_type_digits-large mt-30 mb-8`}>
        {orderFailed || orderRequest ? "..." : `${orderNumber}`}
      </h3>
      <p className={`text text_type_main-medium mb-15`}>
        {!orderFailed && !orderRequest ? (
          "идентификатор заказа"
        ) : (
          <>
            {orderFailed &&
              "Ошибка сервера: невозможно присвоить номер заказа."}
            {orderRequest && "Ожидайте номер заказа"}
          </>
        )}
      </p>
      <WrapperIcon>
        <CheckMarkIcon type="primary" className={styles.image} />
      </WrapperIcon>
      <p className="text text_type_main-default pt-15 pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive pb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
