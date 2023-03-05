import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../actions/ingredients";

export const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
    },
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