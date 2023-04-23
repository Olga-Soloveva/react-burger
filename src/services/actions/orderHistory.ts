import { createAction } from "@reduxjs/toolkit";
import { TOrderFeed } from "../../utils/types";

export const connect = createAction<string, "ORDER_HISTORY_CONNECT">(
  "ORDER_HISTORY_CONNECT"
);
export const disconnect = createAction("ORDER_HISTORY_DISCONNECT");
export const wsConnecting = createAction("ORDER_HISTORY_WS_CONNECTING");
export const wsOpen = createAction("ORDER_HISTORY_WS_OPEN");
export const wsClose = createAction("ORDER_HISTORY_WS_CLOSE");
export const wsMessage = createAction<TOrderFeed, "ORDER_HISTORY_WS_MESSAGE">(
  "ORDER_HISTORY_WS_MESSAGE"
);
export const wsError = createAction<string, "ORDER_HISTORY_WS_ERROR">(
  "ORDER_HISTORY_WS_ERROR"
);

export type TOrderHistoryActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
