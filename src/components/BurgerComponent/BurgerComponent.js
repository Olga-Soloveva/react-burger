import styles from "./burger-component.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import {  useMemo } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerComponent({ component, type }) {
  const isLocked = type === "top" || type === "bottom" ? true : false;
  const nameComponent = useMemo((function () {
    if (type === "top") {
      return component.name + " (верх)";
    } else if (type === "bottom") {
      return component.name + " (низ)";
    }
    return component.name;
  }), [component, type]);

    return (
    <div
      className={`${styles.component} ${
        isLocked ? styles.component_type_locked : ""
      } 
      ${type === "bottom" ? styles.component_position_bottom : ""}mb-4`}
    >
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={nameComponent}
        price={component.price}
        thumbnail={component.image}
      />
    </div>
  );
}

BurgerComponent.propTypes = {
  component: ingredientType.isRequired,
  type: PropTypes.string,
};

export default BurgerComponent;
