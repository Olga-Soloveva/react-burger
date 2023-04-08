import { combineReducers } from "redux";
import { ingredientsSlice } from "./ingredients";
import { orderSlice } from "./order";
import { componentsSlice } from "./components";
import { selectedIngredientSlice } from "./selectedIngredient";
import { userSlice } from "./users";

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    order: orderSlice.reducer,
    components: componentsSlice.reducer,
    selectedIngredient: selectedIngredientSlice.reducer,
    user: userSlice.reducer,
});
