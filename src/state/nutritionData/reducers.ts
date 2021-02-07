import { NutritionDataI } from "../../types";
import initialState from "../initialState";
import { SET_NUTRITION_DATA } from "./actionTypes";

export default function reducer(
  state: Array<NutritionDataI> = initialState.nutritionData,
  action: any
) {
  switch (action.type) {
    case SET_NUTRITION_DATA:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
