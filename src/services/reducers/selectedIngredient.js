import { createSlice } from "@reduxjs/toolkit";

export const selectedIngredientSlice = createSlice({
  name: "selectedIngredient",
  initialState: {},
  reducers: {
    addIngredientDetails: (state, action) => action.payload,
    removeIngredientDetails: (state) => null,
  },
});
