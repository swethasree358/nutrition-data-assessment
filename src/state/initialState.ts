import { NutritionDataI, TableI } from "../types";

export interface StateI {
  nutritionData: Array<NutritionDataI>;
  table: {
    selectedRows: Array<string>;
    numberOfRowsSelected: number;
  };
}

export default {
  nutritionData: [],
  table: {
    selectedRows: [],
    numberOfRowsSelected: 0,
  },
};
