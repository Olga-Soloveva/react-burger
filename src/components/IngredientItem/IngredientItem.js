import styles from "./ingredient-item.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientItem({ ingredient }) {
  const { name, image, price } = ingredient;
  return (
    <div className={styles.container}>
      <img src={image} alt={name} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{price}</p>{" "}
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`text text_type_main-default ${styles.name}`}>{name}</h3>
      <Counter count={1} size="default" extraClass={`m-1 ${styles.counter}`} />
    </div>
  );
}

export default IngredientItem;
