import React from "react";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ buttonText, onClickButton }) => {
  return (
    <button onClick={onClickButton} className="bg-purple-500  text-white px-4 py-2 flex items-center rounded hover:bg-black-700">
      <FaPlus className="w-6 h-6 text-white mr-1 rounded-full bg-black-500 p-1" />
      {buttonText}
    </button>
  );
};

export default AddButton;
