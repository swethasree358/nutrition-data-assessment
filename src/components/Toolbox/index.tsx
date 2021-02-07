import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import CustomDialogBox from "../CustomDialogBox";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  ADD_NEW_NUTRITION_ITEM,
  DELETE_DATA,
  GET_ALL_NUTRITION_VALUES,
} from "../../state/nutritionData/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewNutritionItem,
  resetNutritionData,
} from "../../state/nutritionData/actions";
import { StateI } from "../../state/initialState";

function Toolbox() {
  const dispatch = useDispatch();
  const [shouldOpenAddNewForm, setShouldOpenAddNewFrom] = useState(false);
  const [addNewItem] = useMutation(ADD_NEW_NUTRITION_ITEM);
  const [deleteItem] = useMutation(DELETE_DATA);
  const [getAllData, allDataObj] = useLazyQuery(GET_ALL_NUTRITION_VALUES);
  const {
    table: { numberOfRowsSelected, selectedRows },
  } = useSelector((state: StateI) => state);

  useEffect(() => {
    if (allDataObj.data && allDataObj.data.nutritionData) {
      dispatch(resetNutritionData(allDataObj.data.nutritionData));
    }
  }, [allDataObj, dispatch]);

  function handleAddNew() {
    setShouldOpenAddNewFrom(true);
  }

  function handleDelete() {
    selectedRows.forEach(async (name) => {
      const { data } = await deleteItem({
        variables: {
          name,
        },
      });
      if (data && data.deleteItem && data.deleteItem.success) {
        getAllData();
      }
    });
  }

  async function handleSubmit(values: any) {
    const { data } = await addNewItem({
      variables: {
        ...values,
        calories: parseInt(values.calories),
        fat: parseInt(values.fat),
        carbs: parseInt(values.carbs),
        protein: parseInt(values.protein),
      },
    });

    if (data && data.addNewItem) {
      dispatch(addNewNutritionItem(data.addNewItem));
      setShouldOpenAddNewFrom(false);
    }
  }
  return (
    <>
      {shouldOpenAddNewForm && <CustomDialogBox handleSubmit={handleSubmit} />}
      <div className="toolbar bg-washed-red mt3 pa3 flex justify-between items-center">
        <div>
          <span>{numberOfRowsSelected} Selected</span>
        </div>
        <div className="flex justify-between">
          <div className="mh2">
            <CustomButton
              label="ADD NEW"
              onClick={handleAddNew}
              icon={faPlus}
              classes="bg-white dark-green"
            />
          </div>
          <div className="mh-2">
            <CustomButton
              label="DELETE"
              onClick={handleDelete}
              icon={faTrash}
              classes={`bg-white ${
                numberOfRowsSelected ? "red" : "washed-red"
              }`}
              disabled={!numberOfRowsSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Toolbox;
