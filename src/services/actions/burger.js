import { getIngredients as getIngredientsApi } from "../../utils/ingredients-api";
import { createOrder as createOrderApi } from "../../utils/ingredients-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  createOrderApi
);

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  getIngredientsApi
);
