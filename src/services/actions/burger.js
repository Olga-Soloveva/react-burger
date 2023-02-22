import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
} from "../constants";

import { getIngredients as getIngredientsApi } from "../../utils/ingredients-api";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });
    getIngredientsApi()
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
