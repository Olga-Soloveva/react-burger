import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createOrder, getIngredients } from "../actions/burger";

export const selectedIngredientSlice = createSlice({
  name: "selectedIngredient",
  initialState: {},
  reducers: {
    addIngredientDetails: (state, action) => action.payload,
    removeIngredientDetails: (state) => null,
  },
});

export const componentsSlice = createSlice({
  name: "components",
  initialState: [],
  reducers: {
    getInitialComponents: (state, action) => {
      if (action.payload.length > 0) {
        const bunComponentData = action.payload.find(function (component) {
          return component.type === "bun";
        });

        const otherComponentsData = action.payload.filter((component) => {
          return component.type === "main" || component.type === "sauce";
        });
        return [bunComponentData, ...otherComponentsData];
      } else return [];
    },
  },
});

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
  },
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;      
      state.orderRequest = false;
      state.orderFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.orderRequest = true;
      state.orderFailed = false;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.orderNumber = action.payload;      
      state.orderRequest = false;
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.orderRequest = false;
      state.orderFailed = true;
    });
  }
});

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state, action) => {
      state.ingredientsRequest = true;
      state.ingredientsFailed = false;
    })
    .addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;      
      state.ingredientsRequest = false;
    })
    .addCase(getIngredients.rejected, (state, action) => {
      state.ingredientsRequest = false;
      state.ingredientsFailed = true;
    });
  }
});

export const burger = combineReducers({
  ingredients: ingredientsSlice.reducer,
  components: componentsSlice.reducer,
  selectedIngredient: selectedIngredientSlice.reducer,
  order: orderSlice.reducer,
});
