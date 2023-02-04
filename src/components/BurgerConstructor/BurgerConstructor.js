import styles from "./burger-constructor.module.css";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ components }) {
  const firstComponent = components[0];
  const lastComponent = components[components.length - 1];
  const middleComponent = components.slice(1, components.length - 1);

  return (
    <section className={`${styles.section_container} pt-25 `}>
      <div className={`${styles.burger_components}`}>
        <div className={`${styles.components_container} pl-4 pr-4`}>
          <BurgerComponent component={firstComponent} type="top" />
        </div>
        <div className={` ${styles.components_container_scrol} pl-4 pr-2`}>
          {middleComponent.map((component, index) => {
            return <BurgerComponent component={component} key={index} />;
          })}
        </div>
        <div className={`${styles.components_container} pl-4 pr-4`}>
          <BurgerComponent component={lastComponent} type="bottom" />
        </div>
      </div>
      <div className={`${styles.info} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
