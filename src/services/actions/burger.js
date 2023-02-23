import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
  GET_INIT_COMPONENTS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  CLEAR_ORDER,
} from "../constants";

import { getIngredients as getIngredientsApi } from "../../utils/ingredients-api";
import { createOrder as createOrderApi } from "../../utils/ingredients-api";

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});

export function createOrder(components) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrderApi(components)
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            orderNumber: res.order.number,
          });
        } else {
          dispatch({
            type: GET_ORDER_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_ERROR,
        });
      });
  };
}

export const getInitialComponents = (data) => ({
  type: GET_INIT_COMPONENTS,
  components: data,
});

export const addIngredientDetails = (data) => ({
  type: ADD_INGREDIENT_DETAILS,
  ingredientDetails: data,
});

export const removeIngredientDetails = () => ({
  type: REMOVE_INGREDIENT_DETAILS,
});

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
