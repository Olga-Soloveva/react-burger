import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../actions/order";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
      orderNumber: null,
      orderRequest: false,
      orderFailed: false,
    },
    reducers: {
      clearOrder: (state) => {
        state.orderNumber = null;
        state.orderRequest = false;
        state.orderFailed = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrder.pending, (state, action) => {
          state.orderRequest = true;
          state.orderFailed = false;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
          state.orderNumber = action.payload.order.number;
          state.orderRequest = false;
        })
        .addCase(createOrder.rejected, (state, action) => {
          state.orderRequest = false;
          state.orderFailed = true;
        });
    },
  });
  