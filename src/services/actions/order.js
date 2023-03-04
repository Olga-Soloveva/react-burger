import { createOrder as createOrderApi } from "../../utils/ingredients-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  createOrderApi
);
