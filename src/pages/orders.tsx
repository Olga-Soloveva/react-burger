import styles from "./styles/orders.module.css";
import OrderCard from "../components/OrderCard/OrderCard";

export function OrdersPage() {
  return (
    <main className={styles.main_container}>
      <div className={styles.content}>
        <section className={`${styles.section_container} pt-10 `}>
          <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
          <div className={styles.orders}>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </div>
        </section>
      </div>
    </main>

    //Отразить инфо в случае ошибки по аналогии с BurgerIngredients
  );
}
