import React, { useState } from "react";
import "../Pages/AddTeacher/AddTeacherForm.css";

const AddTextField = ({ label, onChange }) => {
  return (
    <>
      {label !== "" && (
        <div className="flex items-center gap-2 justify-between w-[300px]">
          <label className="block text-[18px] font-medium text-[#333333]">
            {label}
          </label>
          <input
            type="text"
            onChange={onChange}
            placeholder="Enter Amount"
            className="mt-1 p-2 block w-half border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      )}
    </>
  );
};

export default AddTextField;
