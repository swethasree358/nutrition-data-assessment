import React from "react";
import CustomButton from "../CustomButton";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

function Header(props: any) {
  function handleReset(e: any) {}
  return (
    <div className="heading flex justify-between">
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
