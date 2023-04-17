import { TOrderFeed } from "./../../utils/types";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { RootState } from "../store";
import { TOrderFeedActions } from "../actions/orderFeed";

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<TOrderFeed>;
};

export const createSocketMiddleware = (
  wsActions: TwsActionTypes
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = "";
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action: TOrderFeedActions) => {
      const { dispatch } = store;
      const {
        connect,
        disconnect,
        wsClose,
        wsConnecting,
        wsError,
        wsMessage,
        wsOpen,
      } = wsActions;

      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = () => {
          dispatch(wsError("Websocket error"));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData: TOrderFeed = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event: CloseEvent) => {
          if (event.code !== 1000) {
            dispatch(wsError(event.code.toString()));
          }
          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, 3000);
          }
        };
      }

      if (socket && disconnect.match(action)) {
        window.clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        dispatch(wsClose());
        socket.close(1000);
        socket = null;
      }

      next(action);
    };
  };
};
