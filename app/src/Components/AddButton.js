import React from "react";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ buttonText, onClickButton }) => {
  return (
    <button
  onClick={onClickButton}
  className="bg-black text-white px-4 py-2 flex items-center rounded"
  style={{ position: "relative" }}
>
  <div
    className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center absolute"
    style={{ left: "10px" }}
  >
    <FaPlus className="w-4 h-4 text-white" />
  </div>
  <span style={{ marginLeft: "24px" }}>{buttonText}</span>
</button>
  
  );
};

export default AddButton;
