import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
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

const ingredients = (state = initialState.ingredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        // ingredients: {
        //   ...state.ingredients,
          ingredientsRequest: true,
          ingredientsFailed: false,
        // },
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        // ingredients: {
        //   ...state.ingredients,
          ingredients: action.ingredients,
          ingredientsRequest: false,
        // },
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        // ingredients: {
        //   ...state.ingredients,
          ingredientsRequest: false,
          ingredientsFailed: true,
        // },
      };
    }
    default: {
      return state;
    }
  }
};

export const burger = combineReducers({
  ingredients,
});
