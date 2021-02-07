import { NutritionDataI } from "../../types";
import initialState from "../initialState";
import { RESET_DATA, SET_NUTRITION_DATA, ADD_NEW_ITEM } from "./actionTypes";

export default function reducer(
  state: Array<NutritionDataI> = initialState.nutritionData,
  action: any
) {
  switch (action.type) {
    case SET_NUTRITION_DATA:
      return [...state, ...action.payload];
    case RESET_DATA:
      return [...action.payload];
    case ADD_NEW_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
}
