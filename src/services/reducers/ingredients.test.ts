import { getIngredients } from "./../actions/ingredients";
import { testDataIngredients } from "../../utils/testData";
import reducer, { initialState, IngredientsState } from "./ingredients";

const expectStatePending: IngredientsState = {
  ...initialState,
  ingredientsRequest: true,
};

const expectStateFulfilled: IngredientsState = {
  ...initialState,
  ingredients: testDataIngredients.data,
  ingredientsRequest: false,
};

const expectStateRejected: IngredientsState = {
  ...initialState,
  ingredientsFailed: true,
};

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should set ingredientsRequest true when getIngredients is pending", () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStatePending);
  });

  it('should set ingredients when getIngredients is fulfilled', () => {
    const action = { type: getIngredients.fulfilled.type, payload: testDataIngredients };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStateFulfilled);
  });

  it("should set ingredientsFailed true when getIngredients is rejected", () => {
    const action = {
      type: getIngredients.rejected.type,
      payload: { error: "Test error" },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStateRejected);
  });
});
