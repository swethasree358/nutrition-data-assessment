import { combineReducers } from "redux";
import nutritionData from "./nutritionData/reducers";
import table from "./table/reducer";

export default combineReducers({
  nutritionData,
  table,
});
