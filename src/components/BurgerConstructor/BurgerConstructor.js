import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import ingredientType from "../../utils/types";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ components }) {
  const bunComponent = components[0];
  const otherComponent = components.slice(1);

  return (
    <section className={`${styles.section_container} pt-25 `}>
      <div className={`${styles.burger_components}`}>
        <div className={`${styles.components_container} pl-4 pr-4`}>
          <BurgerComponent component={bunComponent} type="top" />
        </div>
        <div className={` ${styles.components_container_scrol} pl-4 pr-2`}>
          {otherComponent.map((component, index) => {
            return (
              <BurgerComponent component={component} key={component._id} />
            );
          })}
        </div>
        <div className={`${styles.components_container} pl-4 pr-4`}>
          <BurgerComponent component={bunComponent} type="bottom" />
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

BurgerConstructor.propTypes = {
  components: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;
