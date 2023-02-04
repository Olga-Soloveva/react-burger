import style from "./burger-component.module.css";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerComponent({ component, type }) {
  const isLocked = type === "top" || type === "bottom" ? true : false;

  return (
    <div
      className={`${style.component} ${
        isLocked ? style.component_type_locked : ""
      } 
      ${type === "bottom" ? style.component_position_bottom : ""}mb-4`}
    >
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={component.name}
        price={component.price}
        thumbnail={component.image}
      />
    </div>
  );
}

export default BurgerComponent;
