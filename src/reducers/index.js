import { combineReducers } from "redux";
import shoesReducer from "./shoes";

export default combineReducers({
  shoes: shoesReducer
});
