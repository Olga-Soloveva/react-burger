import { createReducer } from "@reduxjs/toolkit"
import { TOrderInfo, WebsocketStatus } from "../../utils/types";
import { wsConnecting, wsError, wsMessage, wsOpen, wsClose } from "../actions/orderFeed"

export type orderFeedStore = {
  status: WebsocketStatus;
  connectionError: string;
  orders: TOrderInfo[];
  orderTotal: number;
  orderTotalToday: number;
}

export const initialState: orderFeedStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: '',
  orders: [],
  orderTotal: 0,
  orderTotalToday: 0
}

export const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE
    })
    .addCase(wsError, (state, action) => {
      state.status = WebsocketStatus.ERROR
      state.connectionError = action.payload
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.orderTotal = action.payload.total;
      state.orderTotalToday = action.payload.totalToday;
    })
    .addCase(wsClose, (state, action) => {
      state.status = WebsocketStatus.OFFLINE
      state.orders = [];
      state.orderTotal = 0;
      state.orderTotalToday = 0;
    })
})

