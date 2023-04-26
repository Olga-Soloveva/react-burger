import { getIngredients } from "./../actions/ingredients";
import reducer, { initialState } from "./ingredients";

interface ITestDataIngredients {
  success: boolean;
  data: { _id: string; name: string }[];
}

interface ITesIngredientsState {
  ingredients: { _id: string; name: string }[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

const testDataIngredients: ITestDataIngredients = {
  success: true,
  data: [
    {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
    },
    {
      _id: "643d69a5c3f7b9001cfa0941",
      name: "Биокотлета из марсианской Магнолии",
    },
    {
      _id: "643d69a5c3f7b9001cfa0942",
      name: "Соус Spicy-X",
    },
    {
      _id: "643d69a5c3f7b9001cfa093d",
      name: "Флюоресцентная булка R2-D3",
    },
  ],
};

const expectStatePending: ITesIngredientsState = {
  ...initialState,
  ingredientsRequest: true,
};

const expectStateFulfilled: ITesIngredientsState = {
  ...initialState,
  ingredients: testDataIngredients.data,
  ingredientsRequest: false,
};

const expectStateRejected: ITesIngredientsState = {
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

  it("should set ingredients when getIngredients is fulfilled", () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: testDataIngredients,
    };
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
