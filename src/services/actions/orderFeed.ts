import { createAction } from "@reduxjs/toolkit";
import { TOrderFeed } from "../../utils/types";

export const connect = createAction<string, "ORDER_FEED_CONNECT">(
  "ORDER_FEED_CONNECT"
);
export const disconnect = createAction("ORDER_FEED_DISCONNECT");
export const wsConnecting = createAction("ORDER_FEED_WS_CONNECTING");
export const wsOpen = createAction("ORDER_FEED_WS_OPEN");
export const wsClose = createAction("ORDER_FEED_WS_CLOSE");
export const wsMessage = createAction<TOrderFeed, "ORDER_FEED_WS_MESSAGE">(
  "ORDER_FEED_WS_MESSAGE"
);
export const wsError = createAction<string, "ORDER_FEED_WS_ERROR">(
  "ORDER_FEED_WS_ERROR"
);

export type TOrderFeedActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsConnecting>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;
