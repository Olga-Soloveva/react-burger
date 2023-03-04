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
  initialState: {
    componentId: 0,
    components: [],
  },
  reducers: {
    getComponent: (state, action) => {
      const component = JSON.parse(JSON.stringify(action.payload));
      if (component.type === "bun") {
        if (
          state.components.some((item) => {
            return item.type === "bun" && item._id === component._id;
          })
        ) {
          return;
        } else {
          state.components = state.components.filter((item) => {
            return item.type !== "bun";
          });
        }
      }
      component.componentId = state.componentId;
      state.components = [...state.components, component];
      state.componentId += 1;
    },
    deleteComponent: (state, action) => {
      state.components = state.components.filter((item) => {
        return item.componentId !== action.payload.componentId;
      });
    },
    moveComponent: (state, action) => {
      if (
        action.payload.componentDrop.componentId ===
        action.payload.componentDrag.componentId
      ) {
        return;
      } else {
        const indexDragItem = state.components.findIndex(
          (item) =>
            item.componentId === action.payload.componentDrag.componentId
        );
        state.components = state.components.filter((item) => {
          return item.componentId !== action.payload.componentDrop.componentId;
        });
        state.components.splice(indexDragItem, 0, action.payload.componentDrop);
      }
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
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number;
        state.orderRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderFailed = true;
      });
  },
});

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state, action) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.data;
        state.ingredientsRequest = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
      });
  },
});

export const burger = combineReducers({
  ingredients: ingredientsSlice.reducer,
  components: componentsSlice.reducer,
  selectedIngredient: selectedIngredientSlice.reducer,
  order: orderSlice.reducer,
});
