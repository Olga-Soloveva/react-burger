import styles from "./burger-component.module.css";
import React, {useMemo, FC} from "react";
import { mergeRefs } from "react-merge-refs";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../utils/types";
import { useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { componentsSlice } from "../../services/reducers/components";

interface IBurgerComponent {
  component: TIngredient;
  type?: "top" | "bottom";
}

const BurgerComponent: FC<IBurgerComponent> = ({ component, type}) => {
  const { deleteComponent, moveComponent } = componentsSlice.actions;
  const componentDrag = component
  const dispatch = useDispatch();
  const isLocked = type === "top" || type === "bottom" ? true : false;
  const nameComponent = useMemo(
    function () {
      if (type === "top") {
        return component.name + " (верх)";
      } else if (type === "bottom") {
        return component.name + " (низ)";
      }
      return component.name;
    },
    [component, type]
  );

  const handledeleteButton = () => {
    dispatch(deleteComponent(component));
  };

  const [, dragRef] = useDrag({
    type: "component",
    item: component,
  });

  const [{ isHover}, dropComponent] = useDrop({
    accept: "component",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(componentDrop) {
      dispatch(moveComponent({componentDrag, componentDrop}));
    },
  });

  return (
    <div
      {...(!isLocked && {
        ref: mergeRefs([dragRef, dropComponent]),
      })}
      className={`${styles.component} ${
        isLocked ? styles.component_type_locked : ""
      } ${isHover ? styles.hover : ""}
      ${type === "bottom" ? styles.component_position_bottom : ""}mb-4`}
    >
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={nameComponent}
        price={component.price}
        thumbnail={component.image}
        handleClose={handledeleteButton}
      />
    </div>
  );
}

export default React.memo(BurgerComponent);
