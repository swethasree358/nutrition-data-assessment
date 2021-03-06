import React, { useEffect } from "react";
import CustomButton from "../CustomButton";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { RESET_DATA } from "../../state/nutritionData/queries";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { resetNutritionData } from "../../state/nutritionData/actions";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_NUTRITION_VALUES } from "../../state/nutritionData/queries";

function Header() {
  const [getAllData, allDataObj] = useLazyQuery(GET_ALL_NUTRITION_VALUES);
  const dispatch = useDispatch();
  const [resetData] = useMutation(RESET_DATA);

  // ResetNutritionData
  useEffect(() => {
    if (allDataObj.data && allDataObj.data.nutritionData) {
      dispatch(resetNutritionData(allDataObj.data.nutritionData));
    }
  }, [allDataObj, dispatch]);

  // Handles Reset button click
  async function handleReset(e: any) {
    const { data } = await resetData();
    if (data && data.reset && data.reset.success) {
      getAllData();
    }
  }
  return (
    <div className="heading flex justify-between" data-testid="header">
      <div className="f2 avenir">Nutrition List</div>
      <CustomButton
        label="RESET DATA"
        onClick={handleReset}
        icon={faRedo}
        classes="bg-dark-green white b--none"
      />
    </div>
  );
}

export default Header;
