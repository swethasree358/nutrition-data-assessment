import React from "react";

interface CustomCheckboxProps {
  name: string;
  onChange: (e: any) => void;
  checked: boolean;
}

function CustomCheckbox(props: CustomCheckboxProps) {
  const { name, onChange, checked } = props;
  return (
    <div className="flex items-center mb2">
      <input
        className="mr2"
        type="checkbox"
        name={name}
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
}

export default CustomCheckbox;
