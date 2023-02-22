import { combineReducers } from "redux";
import { burger} from "./reducers/burger";

export const rootReducer = combineReducers({
    burger,
});
