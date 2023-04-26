import { initialState, orderHistoryReducer as reducer } from "./orderHistrory";
import * as types from "../actions/orderHistory";

const testDataOrderHistory = {
  success: true,
  orders: [
    {
      _id: "64498afb45c6f2001be6dded",
      ingredients: ["643d69a5c3f7b9001cfa093d"],
      status: "done",
    },
  ],
  total: 1281,
  totalToday: 133,
};

describe("orderHistoryreducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should set status 'CONNECTING' when wsConnecting", () => {
    const action = { type: types.wsConnecting };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: "CONNECTING" });
  });

  it("should set status 'ONLINE' when wsOpen", () => {
    const action = { type: types.wsOpen };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, status: "ONLINE" });
  });

  it("should set status 'ERROR' and connectionError when wsError", () => {
    const action = { type: types.wsError, payload: "Test Error" };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      status: "ERROR",
      connectionError: "Test Error",
    });
  });

  it("should set orders info when wsMessage", () => {
    const action = { type: types.wsMessage, payload: testDataOrderHistory };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: [
        {
          _id: "64498afb45c6f2001be6dded",
          ingredients: ["643d69a5c3f7b9001cfa093d"],
          status: "done",
        },
      ],
      orderTotal: 1281,
      orderTotalToday: 133,
    });
  });

  it("should set status 'OFFLINE' and order info when wsClose", () => {
    const action = { type: types.wsClose };
    const state = reducer(
      {
        ...initialState,
        orders: [
          {
            _id: "64498afb45c6f2001be6dded",
            ingredients: ["643d69a5c3f7b9001cfa093d"],
            status: "done",
          },
        ],
        orderTotal: 1281,
        orderTotalToday: 133,
      } as any,
      action
    );
    expect(state).toEqual({
      status: "OFFLINE",
      connectionError: "",
      orders: [],
      orderTotal: 0,
      orderTotalToday: 0,
    });
  });
});
