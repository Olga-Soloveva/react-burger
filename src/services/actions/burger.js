import { getIngredients as getIngredientsApi } from "../../utils/ingredients-api";
import { createOrder as createOrderApi } from "../../utils/ingredients-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (components) => {
    const response = await createOrderApi(components);
    return response.order.number;
  }
);

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    const response = await getIngredientsApi();
    return response.data;
  }
);