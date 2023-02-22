import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
  GET_INIT_COMPONENTS,
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

const components = (state = initialState.components, action) => {
  switch (action.type) {
    case GET_INIT_COMPONENTS: {
      if (action.components.length > 0) {
        const bunComponentData = action.components.find(function (component) {
          return component.type === "bun";
        });

        const otherComponentsData = action.components.filter((component) => {
          return component.type === "main" || component.type === "sauce";
        });
        return [bunComponentData, ...otherComponentsData];
      } else return [];
    }
    default: {
      return state;
    }
  }
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
  components,
  selectedIngredient,
});
