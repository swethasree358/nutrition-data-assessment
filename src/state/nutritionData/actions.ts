import { NutritionDataI } from "../../types";
import { SET_NUTRITION_DATA } from "./actionTypes";

export function setNutritionData(payload: Array<NutritionDataI>) {
  return {
    type: SET_NUTRITION_DATA,
    payload,
  };
}
