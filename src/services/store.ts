import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/index";
import { createSocketMiddleware } from "./middleware/socket-middleware";
import {
  connect as OrderFeedWsConnect, 
  disconnect as OrderFeedWsDisconnect,
  wsConnecting as OrderFeedWsConnecting,
  wsOpen as OrderFeedWsOpen,
  wsClose as OrderFeedWsClose,
  wsMessage as OrderFeedWsMessage,
  wsError as OrderFeedWsError, 
} from "./actions/orderFeed"

import {
  connect as OrderHistoryWsConnect, 
  disconnect as OrderHistoryWsDisconnect,
  wsConnecting as OrderHistoryWsConnecting,
  wsOpen as OrderHistoryWsOpen,
  wsClose as OrderHistoryWsClose,
  wsMessage as OrderHistoryWsMessage,
  wsError as OrderHistoryWsError, 
} from "./actions/orderHistory"

const wsActionsOrderFeed = {
  connect: OrderFeedWsConnect,
  disconnect: OrderFeedWsDisconnect,
  wsConnecting: OrderFeedWsConnecting,
  wsOpen: OrderFeedWsOpen,
  wsClose: OrderFeedWsClose,
  wsError: OrderFeedWsError,
  wsMessage: OrderFeedWsMessage,
};

const wsActionsOrderHistory = {
  connect: OrderHistoryWsConnect,
  disconnect: OrderHistoryWsDisconnect,
  wsConnecting: OrderHistoryWsConnecting,
  wsOpen: OrderHistoryWsOpen,
  wsClose: OrderHistoryWsClose,
  wsError: OrderHistoryWsError,
  wsMessage: OrderHistoryWsMessage,
};

const wsMiddlewareOrderFeed = createSocketMiddleware(wsActionsOrderFeed)
const wsMiddlewareOrderHistory = createSocketMiddleware(wsActionsOrderHistory)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsMiddlewareOrderFeed, wsMiddlewareOrderHistory)
  }
});

export type RootState = ReturnType<typeof rootReducer>
