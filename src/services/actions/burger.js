import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../constants";

import { getIngredients as getIngredientsApi } from "../../utils/ingredients-api";

export const addIngredientDetails = (data) => ({
  type: ADD_INGREDIENT_DETAILS,
  ingredientDetails: data,
})

export const removeIngredientDetails = () => ({
  type: REMOVE_INGREDIENT_DETAILS,
})

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
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
            type: GET_INGREDIENTS_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        });
      });
  };
}
