import styles from "./order-details.module.css";
import PropTypes from "prop-types";
import WrapperIcon from "../WtapperIcon/WrapperIcon";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = ({ orderNumber }) => {
 
  return (
    <>
      <h3 className={`text text_type_digits-large mt-30 mb-8`}> {orderNumber}</h3>
      <p className={`text text_type_main-medium mb-15`}>идентификатор заказа</p>
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

OrderDetails.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.string,
    status: PropTypes.string,
  })
}

export default OrderDetails;
