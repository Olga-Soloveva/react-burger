import styles from "./styles/page.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "../utils/hooks";
import { useState, useEffect, useMemo } from "react";
import { getIngredients } from "../services/actions/ingredients";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { TIngredient } from "../utils/types";

export function IngredientPage() {
  const dispatch = useDispatch();
  const [ingredientFound, setIngredientFound] = useState("unknown");

  let { ingredientId } = useParams();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients]);

  const ingredient = useMemo(() => {
    if (ingredients.length) {
      const dataIngredient = ingredients.find(function (item: TIngredient) {
        return item._id === ingredientId;
      });
      if (dataIngredient) {
        setIngredientFound("found");
        return dataIngredient;
      }
    } else {
      setIngredientFound("notfound");
      return;
    }
  }, [ingredientId, ingredients]);

  return (
    <div className={`${styles.content}  ${styles.content_page_ingredient}`}>
      {!ingredientsFailed && !ingredientsRequest ? (
        <>
          <h2 className={`text text_type_main-large ${styles.title} mt-10`}>
            Детали ингредиента
          </h2>
          {ingredientFound === "found" && ingredient && (
            <IngredientDetails ingredient={ingredient} />
          )}
          {ingredientFound === "notfound" && (
            <>
              <p className="text text_type_main-default mt-10 mb-10">
                Ингредиент не найден.
              </p>
            </>
          )}
        </>
      ) : (
        <>
          {ingredientsFailed && (
            <p className="text text_type_main-default pt-4">
              Ошибка сервера: невозможно загрузить ингредиенты.
            </p>
          )}
          {ingredientsRequest && (
            <p className="text text_type_main-default pt-4">
              Загрузка ингредиентов...
            </p>
          )}
        </>
      )}
    </div>
  );
}
