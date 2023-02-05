import styles from "./burger-component.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerComponent({ component, type }) {
  const isLocked = type === "top" || type === "bottom" ? true : false;
  const nameComponent = (function () {
    if (type === "top") {
      return component.name + " (верх)";
    } else if (type === "bottom") {
      return component.name + " (низ)";
    }
    return component.name;
  })();

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
  component: PropTypes.shape(ingredientType).isRequired,
  type: PropTypes.string.isRequired,
};

export default BurgerComponent;
