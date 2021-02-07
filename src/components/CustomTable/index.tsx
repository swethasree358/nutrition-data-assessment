import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { StateI } from "../../state/initialState";
import { NutritionDataI } from "../../types";
import { GET_ALL_NUTRITION_VALUES } from "../../state/nutritionData/queries";
import { setNutritionData } from "../../state/nutritionData/actions";

const keysToIngore = ["__typename", "id"];

const headerCells = [
  {
    name: "name",
    label: "Dessert (100g serving)",
  },
  {
    name: "calories",
    label: "Calories",
  },
  {
    name: "fat",
    label: "Fat (g)",
  },
  {
    name: "carbs",
    label: "Carbs (g)",
  },
  {
    name: "protein",
    label: "Protein",
  },
];

function CustomTable() {
  const dispatch = useDispatch();
  const { nutritionData } = useSelector((state: StateI) => state);

  const { error, data } = useQuery<{ nutritionData: Array<NutritionDataI> }>(
    GET_ALL_NUTRITION_VALUES
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (data && nutritionData.length === 0) {
      dispatch(setNutritionData(data.nutritionData));
    }
  }, [data, error, dispatch]);

  return (
    <table className="f6 w-100 mw8 center collapse">
      <thead>
        <tr className="bg-white">
          {headerCells.map((cell) => (
            <th key={cell.name} className="pa3">
              {cell.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="lh-copy">
        {nutritionData.map((rowItem, index) => (
          <tr key={index} className="bb b--moon-gray">
            {Object.keys(rowItem)
              .filter((key) => !keysToIngore.includes(key))
              .map((key) => (
                <td key={key} className="pa3 tc">
                  {rowItem[key as keyof NutritionDataI]}
                </td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomTable;
