import React from "react";
import "../Pages/SearchDetailsShow/SearchDetails.css";

const TextNameComponent = ({ head, disc }) => {
  return (
    <div className="textDiv">
      <p className="text-xl text-gray-600">{head}</p>
      <p className="text-xl font-bold ">{disc}</p>
    </div>
  );
};

export default TextNameComponent;
