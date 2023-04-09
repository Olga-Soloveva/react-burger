import styles from "./order-card-info.module.css";
import React, { FC } from "react";



const OrderCardInfo: FC<any> = ({ order }) => {
  console.log(order);

  return (
    <>
      <h3 className={`text text_type_main-medium mt-4 mb-8 ${styles.title}`}>
        sfs
      </h3>
    </>
  );
};

export default React.memo(OrderCardInfo);
