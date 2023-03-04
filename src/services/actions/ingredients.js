import { getIngredients as getIngredientsApi } from "../../utils/ingredients-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getIngredients = createAsyncThunk(
    "ingredients/getIngredients",
    getIngredientsApi
  );

  