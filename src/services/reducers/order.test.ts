import { createOrder } from "../actions/order";
import { testDataOrder } from "../../utils/testData";
import reducer, { initialState, OrderState, clearOrder } from "./order";

const expectStateClearOrder: OrderState = {
    ...initialState,
    orderNumber: null
  };

const expectStatePending: OrderState = {
  ...initialState,
  orderRequest: true,
};

const expectStateFulfilled: OrderState = {
  ...initialState,
  orderNumber: testDataOrder.order.number,
  orderRequest: false,
};

const expectStateRejected: OrderState = {
  ...initialState,
  orderFailed: true,
};

describe("orders reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should set orderNumber to null when clearOrder", () => {
    const action = { type: clearOrder };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStateClearOrder);
  });

  it("should set orderRequest true when createOrder is pending", () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStatePending);
  });

  it("should set orderNumber when createOrder is fulfilled", () => {
    const action = { type: createOrder.fulfilled.type, payload: testDataOrder };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStateFulfilled);
  });

  it("should set orderFailed true when createOrder is rejected", () => {
    const action = {
      type: createOrder.rejected.type,
      payload: { error: "Test error" },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStateRejected);
  });
});
