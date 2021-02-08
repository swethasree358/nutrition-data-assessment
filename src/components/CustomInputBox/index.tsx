import React from "react";

interface IInputBox {
  label: string;
  name: string;
  onChange: (e: any) => void;
  value: string;
}

// Custom Input Box
function CustomInputBox(props: IInputBox) {
  const { label, name, onChange, value } = props;
  return (
    <div>
      <div className="b mb2">{label}</div>
      <div>
        <input
          name={name}
          onChange={onChange}
          value={value}
          className="w-90 pv2 ph3"
        />
      </div>
    </div>
  );
}

export default CustomInputBox;
