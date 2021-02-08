import { gql } from "@apollo/client";

export const GET_ALL_NUTRITION_VALUES = gql`
  query NutritionDataI {
    nutritionData {
      nutritionId
      name
      calories
      fat
      carbs
      protein
    }
  }
`;

export const RESET_DATA = gql`
  mutation {
    reset {
      success
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
      nutritionId
      name
      calories
      fat
      carbs
      protein
    }
  }
`;

export const DELETE_DATA = gql`
  mutation deleteItem(
    $name: String
  ) {
    deleteItem(
      name: $name
    ) {
      success
    }
  }
`;
