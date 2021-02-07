import { NutritionDataI } from "../../types";
import { SET_NUTRITION_DATA, RESET_DATA, ADD_NEW_ITEM } from "./actionTypes";

export function setNutritionData(payload: Array<NutritionDataI>) {
  return {
    type: SET_NUTRITION_DATA,
    payload,
  };
}

export function resetNutritionData(payload: Array<NutritionDataI>) {
  return {
    type: RESET_DATA,
    payload,
  };
}

export function addNewNutritionItem(payload: NutritionDataI) {
  return {
    type: ADD_NEW_ITEM,
    payload,
  };
}
