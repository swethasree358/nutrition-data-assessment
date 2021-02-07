import { gql } from "@apollo/client";

export const GET_ALL_NUTRITION_VALUES = gql`
  query NutritionDataI {
    nutritionData {
      id
      name
      calories
      fat
      carbs
      protein
    }
  }
`;

export const ADD_NEW_NUTRITION_ITEM = gql`
  mutation addNewItem(
    $name: String
    $calories: Int
    $fat: Int
    $carbs: Int
    $protein: Int
  ) {
    addNewItem(
      item: {
        name: $name
        calories: $calories
        fat: $fat
        carbs: $carbs
        protein: $protein
      }
    ) {
      id
      name
      calories
      fat
      carbs
      protein
    }
  }
`;
