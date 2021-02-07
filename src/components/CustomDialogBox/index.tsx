import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import CustomInputBox from "../CustomInputBox";
import CustomButton from "../CustomButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const FormInputs = [
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

interface DialogBoxProps {
  handleSubmit: (formValues: any) => void;
}

function DialogBox(props: DialogBoxProps) {
  const { handleSubmit } = props;
  const [formValues, setFormValues] = useState<any>({
    name: "",
    calories: "",
    fat: "",
    carbs: "",
    protein: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  return (
    <div className="fixed w-100 bg-light-gray h-100 left-0 top-0">
      <section className="mw6 bg-white center ma3 pa3">
        <div className="bg-yellow pa3 flex space-around justify-around">
          <div>
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <div>Please fill all the details before submitting the form</div>
        </div>
        {FormInputs.map((input) => (
          <div key={input.name} className="mv3">
            <CustomInputBox
              label={input.label}
              name={input.name}
              value={formValues[input.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="mv3 tc">
          <CustomButton
            label="Submit"
            onClick={() => handleSubmit(formValues)}
            icon={faCheck}
            classes="bg-dark-green white w-90"
          />
        </div>
      </section>
    </div>
  );
}

export default DialogBox;
