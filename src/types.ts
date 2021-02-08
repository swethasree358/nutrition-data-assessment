export interface NutritionDataI {
  nutritionId: string;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface TableI {
  selectedRows: Array<string>;
  numberOfRowsSelected: number;
}
