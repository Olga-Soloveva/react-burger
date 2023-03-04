import { combineReducers } from "redux";
import { ingredientsSlice } from "./reducers/ingredients";
import { orderSlice } from "./reducers/order";
import { componentsSlice } from "./reducers/components";
import { selectedIngredientSlice } from "./reducers/selectedIngredient";

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
    components: componentsSlice.reducer,
    selectedIngredient: selectedIngredientSlice.reducer,
});
