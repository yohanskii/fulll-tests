import React from "react";

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

function Checkbox({ label, value, onChange }: CheckboxProps) {
  return (
    <div style={{ display: "block" }}>
      <input
        style={{ display: "inline-block", marginRight: "10px" }}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      {label}
    </div>
  );
}

export default Checkbox;
