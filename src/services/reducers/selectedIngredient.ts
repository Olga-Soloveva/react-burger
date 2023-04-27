import { createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "../../utils/types";

export interface SelectedIngredientState {
  selectedIngredient: TIngredient | null;
}

export const initialState: SelectedIngredientState = {
  selectedIngredient: null
};

export const selectedIngredientSlice = createSlice({
  name: "selectedIngredient",
  initialState: initialState,
  reducers: {
    addIngredientDetails: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    removeIngredientDetails: (state) => {
      state.selectedIngredient = null;
    },
  },
});

export const { addIngredientDetails, removeIngredientDetails } = selectedIngredientSlice.actions;

export default selectedIngredientSlice.reducer;