import style from "./burger-constructor.module.css";
import BurgerComponent from "../BurgerComponent/BurgerComponent";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ components }) {
  let firstComponent = components[0];
  let lastComponent = components[components.length - 1];
  let middleComponent = components.slice(1, components.length - 1);

  console.log(components);

  return (
    <section className={`${style.section_container} pt-25 `}>
      <div className={`${style.burger_components}`}>
        <div className={`${style.components_container} pl-4 pr-4`}>
          <BurgerComponent component={firstComponent} type="top" />
        </div>
        <div className={` ${style.components_container_scrol} pl-4 pr-2`}>
          {middleComponent.map((component, index) => {
            return <BurgerComponent component={component} key={index} />;
          })}
        </div>
        <div className={`${style.components_container} pl-4 pr-4`}>
          <BurgerComponent component={lastComponent} type="bottom" />
        </div>
      </div>
      <div className={`${style.info} mt-10`}>
        <div className={`${style.price} mr-10`}>
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
