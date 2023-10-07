import React from "react";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ buttonText }) => {
  return (
    <button className="bg-purple-500  text-white px-4 py-2 flex items-center rounded hover:bg-purple-700">
      <FaPlus className="w-6 h-6 text-white mr-1 rounded-full bg-green-500 p-1" />
      {buttonText}
    </button>
  );
};

export default AddButton;
