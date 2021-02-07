import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomDialogBox from "../CustomDialogBox";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ADD_NEW_NUTRITION_ITEM } from "../../state/nutritionData/queries";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setNutritionData } from "../../state/nutritionData/actions";

function Toolbox() {
  const dispatch = useDispatch();
  const [shouldOpenAddNewForm, setShouldOpenAddNewFrom] = useState(false);
  const [addNewItem] = useMutation(ADD_NEW_NUTRITION_ITEM);

  function handleAddNew() {
    setShouldOpenAddNewFrom(true);
  }

  function handleDelete(e: any) {}

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
      dispatch(setNutritionData([data.addNewItem]));
      setShouldOpenAddNewFrom(false);
    }
  }
  return (
    <>
      {shouldOpenAddNewForm && <CustomDialogBox handleSubmit={handleSubmit} />}
      <div className="toolbar bg-washed-red mt3 pa3 flex justify-between items-center">
        <div>
          <span>0 Selected</span>
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
              classes={`bg-white washed-red`}
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Toolbox;
