import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../actions/ingredients";

import { TIngredient } from "../../utils/types";

interface IngredientsState {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
  } as IngredientsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state, action) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.ingredientsRequest = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
      });
  },
});
