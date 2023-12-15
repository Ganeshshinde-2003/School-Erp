// AddTextField.js
import React, { useState } from "react";

const AddTextField = ({ label }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      {label !== "" && (
        <div>
          <label>{label}</label>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={`Enter ${label}`}
          />
        </div>
      )}
    </>
  );
};

export default AddTextField;
