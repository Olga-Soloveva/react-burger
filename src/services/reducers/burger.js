import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../constants";

import { combineReducers } from "redux";

const initialState = {
  ingredients: {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
  },
  components: [],
  selectedIngredient: {},
  order: {},
};

const selectedIngredient = (
  state = initialState.selectedIngredient,
  action
) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return action.ingredientDetails;
    }
    case REMOVE_INGREDIENT_DETAILS: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const ingredients = (state = initialState.ingredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const burger = combineReducers({
  ingredients,
  selectedIngredient,
});
