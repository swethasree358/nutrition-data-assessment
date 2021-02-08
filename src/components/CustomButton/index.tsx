import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface IButton {
  label: string;
  onClick: (e: any) => void;
  icon: IconDefinition;
  classes?: string;
  disabled?: boolean;
}

// Custom Button Component
function CustomButton(props: IButton) {
  const { label, onClick, icon, classes, disabled = false } = props;
  return (
    <button
      onClick={onClick}
      className={`pa2 ${classes}`}
      disabled={disabled}
    >
      <span className="mr2">
        <FontAwesomeIcon icon={icon} />
      </span>
      <span>{label}</span>
    </button>
  );
}

export default CustomButton;
