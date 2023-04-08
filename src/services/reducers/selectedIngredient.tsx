import { createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "../../utils/types";

interface SelectedIngredientState {
  selectedIngredient: TIngredient | null;
}

export const selectedIngredientSlice = createSlice({
  name: "selectedIngredient",
  initialState: { selectedIngredient: null } as SelectedIngredientState,
  reducers: {
    addIngredientDetails: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    removeIngredientDetails: (state) => {
      state.selectedIngredient = null;
    },
  },
});
