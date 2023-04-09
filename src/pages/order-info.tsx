import { useParams } from "react-router-dom";

import OrderCardInfo from "../components/OrderCardInfo/OrderCardInfo";

export function OrderInfoPage() {
  let { orderId } = useParams();

  return <OrderCardInfo order={orderId} />;
}
