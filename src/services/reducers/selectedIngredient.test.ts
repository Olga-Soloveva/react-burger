import reducer, {
  initialState,
  SelectedIngredientState,
  addIngredientDetails,
  removeIngredientDetails,
} from "./selectedIngredient";
import { TIngredient } from "../../utils/types";

const testDataSelectedIngredient: TIngredient = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
};

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
    const state = reducer({
      ...initialState,
      selectedIngredient: testDataSelectedIngredient,
    }, action);
    expect(state).toEqual(expectStateRemoveIngredientDetails);
  });
});
