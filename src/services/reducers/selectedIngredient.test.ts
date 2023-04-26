import reducer, {
  initialState,
  SelectedIngredientState,
  addIngredientDetails,
  removeIngredientDetails,
} from "./selectedIngredient";
import { testDataSelectedIngredient } from "../../utils/testData";

const expectStateAddIngredientDetails: SelectedIngredientState = {
  ...initialState,
  selectedIngredient: testDataSelectedIngredient,
};

const expectStateRemoveIngredientDetails: SelectedIngredientState = {
  ...initialState,
  selectedIngredient: null,
};

describe("selectedIngredient reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should set selectedIngredient when addIngredientDetails", () => {
    const action = {
      type: addIngredientDetails,
      payload: testDataSelectedIngredient,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStateAddIngredientDetails);
  });

  it("should remove selectedIngredient when removeIngredientDetails", () => {
    const action = { type: removeIngredientDetails };
    const state = reducer(initialState, action);
    expect(state).toEqual(expectStateRemoveIngredientDetails);
  });
});
