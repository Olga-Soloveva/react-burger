import { createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "../../utils/types";

interface SelectedIngredientState {
  selectedIngredient: TIngredient | null;
}

const initialState: SelectedIngredientState = {
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
