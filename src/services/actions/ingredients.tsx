import { getIngredients as getIngredientsApi } from "../../utils/ingredientsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    getIngredientsApi
  );

  