import { createOrder as createOrderApi } from "../../utils/ingredientsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  createOrderApi
);
