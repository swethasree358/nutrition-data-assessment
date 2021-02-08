import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { StateI } from "../../state/initialState";
import { NutritionDataI } from "../../types";
import { GET_ALL_NUTRITION_VALUES } from "../../state/nutritionData/queries";
import { setNutritionData } from "../../state/nutritionData/actions";
import CustomCheckbox from "../CustomCheckbox";
import {
  setNumberOfRowsSelected,
  setSelectedRows,
} from "../../state/table/actions";

const keysToIngore = ["__typename", "nutritionId"];

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
  const [selected, setSelected] = React.useState<string[]>([]);

  // API call to get all Nutrition Data
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

  useEffect(() => {
    dispatch(setNumberOfRowsSelected(selected.length));
    dispatch(setSelectedRows(selected));
  }, [selected, dispatch]);

  // handles select all checbox change
  function handleSelectAllChange(e: any) {
    if (e.target.checked) {
      const newSelecteds = nutritionData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  // handles checkboxes in the rows
  function handleRowCheckboxChange(e: any) {
    const { name } = e.target;
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [...selected];

    if (selected.includes(name)) {
      newSelected.splice(selectedIndex, 1);
    } else {
      newSelected.push(name);
    }

    setSelected(newSelected);
  }

  return (
    <table className="f6 w-100 mw8 center collapse" data-testid="table">
      <thead>
        <tr className="bg-white">
          <th className="pa3">
            <CustomCheckbox
              name="selectAll"
              onChange={handleSelectAllChange}
              checked={
                nutritionData.length > 0 &&
                selected.length === nutritionData.length
              }
            />
          </th>
          {headerCells.map((cell) => (
            <th key={cell.name} className="pa3">
              {cell.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="lh-copy">
        {nutritionData.map((rowItem, index) => (
          <tr key={index} className="bb b--light-gray" data-testid="table-row">
            <td className="pa3 tc">
              <CustomCheckbox
                name={rowItem.name}
                onChange={handleRowCheckboxChange}
                checked={selected.includes(rowItem.name)}
              />
            </td>
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
