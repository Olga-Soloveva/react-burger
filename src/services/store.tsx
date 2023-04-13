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

const wsActions = {
  connect: OrderFeedWsConnect,
  disconnect: OrderFeedWsDisconnect,
  wsConnecting: OrderFeedWsConnecting,
  wsOpen: OrderFeedWsOpen,
  wsClose: OrderFeedWsClose,
  wsError: OrderFeedWsError,
  wsMessage: OrderFeedWsMessage,
};

const websocketMiddleware = createSocketMiddleware(wsActions)

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(websocketMiddleware)
  }
});

export type RootState = ReturnType<typeof rootReducer>
